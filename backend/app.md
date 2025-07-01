# Motoko Backend Analysis (`app.mo`)

This document provides an analysis of the Motoko backend file (`backend/app.mo`), describing its structure, types, state, helper functions, public API, and high-level flow.

---

## 1. Imports

The file imports several modules from the Motoko base library and the `mo:map/Map` library:

- **Base types:** `Bool`, `Array`, `Blob`, `Iter`, `Nat`, `Principal`, `Text`, `Option`
- **HashMap:** For mapping users to their files and file names to file data.

---

## 2. Actor Declaration

```motoko
persistent actor Filevault {
  // ...
}
```

- Declares a persistent actor named `Filevault`. This is the main canister (smart contract) for your backend.

---

## 3. Type Definitions

- **FileChunk:** Represents a chunk of a file (for chunked uploads).
- **File:** Represents a file, including its name, all its chunks, total size, and type.
- **UserFiles:** A map from file names to `File` objects for each user.

---

## 4. State

- **files:**  
  `private var files = HashMap.new<Principal, UserFiles>();`  
  This is a map from user principals (identities) to their files.

---

## 5. Helper Functions

- **getUserFiles(user : Principal): UserFiles**  
  Returns the file map for a user, creating it if it doesn't exist.

---

## 6. Public Methods (API)

All public methods are `shared`, meaning they can be called from outside the canister (e.g., from your frontend).

- **checkFileExists(name : Text): async Bool**  
  Checks if a file with the given name exists for the caller.

- **uploadFileChunk(name, chunk, index, fileType): async ()**  
  Uploads a chunk of a file. If the file doesn't exist, it creates it; otherwise, it appends the chunk.

- **getFiles(): async [{ name : Text; size : Nat; fileType : Text }]**  
  Returns a list of the caller's files with their names, sizes, and types.

- **getTotalChunks(name): async Nat**  
  Returns the number of chunks for a given file.

- **getFileChunk(name, index): async ?Blob**  
  Returns a specific chunk of a file by index.

- **getFileType(name): async ?Text**  
  Returns the file type for a given file.

- **deleteFile(name): async Bool**  
  Deletes a file and returns whether the operation was successful.

---

## 7. How It Works (High-Level Flow)

- Each user (identified by their Principal) has their own file map.
- Files are uploaded in chunks, allowing for large files to be handled.
- The backend supports basic file operations: upload, list, retrieve, and delete.

---

## How File Download Works

There is no single function called "download" in `app.mo`. Instead, downloading a file is accomplished through a combination of functions that allow the frontend to retrieve all the chunks of a file and reconstruct it.

### Relevant Functions for Downloading a File

1. **getFiles**

   - Lists all files for the user (names, sizes, types).
   - Useful for showing available files to download.

2. **getTotalChunks(name : Text) : async Nat**

   - Returns the total number of chunks for a given file.
   - The frontend uses this to know how many chunks to request.

3. **getFileChunk(name : Text, index : Nat) : async ?Blob**

   - Returns a specific chunk of a file by its index.
   - The frontend calls this repeatedly (for each chunk index) to retrieve the entire file, piece by piece.

4. **getFileType(name : Text) : async ?Text**
   - Returns the file type (MIME type) for a given file.
   - Useful for reconstructing the file with the correct type on the client side.

### Download Flow

- The frontend first calls `getTotalChunks` to determine how many chunks the file has.
- Then, it calls `getFileChunk` for each chunk index (from 0 to totalChunks-1).
- The frontend reassembles the chunks in order to reconstruct the full file for the user to download.

**Summary:**
There is no single "download" function, but the combination of `getTotalChunks` and `getFileChunk` provides all the data needed to download and reconstruct a file.

If you want, you can implement a single function to return the whole file at once, but the current approach is chunk-based for scalability and efficiency.

---

### Next Steps

If you want, we can:

- Dive deeper into any specific function or type.
- Discuss how to extend or modify this backend.
- Talk about how the frontend might interact with these APIs.

Let me know what you'd like to focus on!

---

## Deep Dive: `getUserFiles` Function

Let's analyze the `getUserFiles` function and clarify the use of `phash`:

```motoko
private func getUserFiles(user : Principal) : UserFiles {
  switch (HashMap.get(files, phash, user)) {
    case null {
      let newFileMap = HashMap.new<Text, File>();
      let _ = HashMap.put(files, phash, user, newFileMap);
      newFileMap;
    };
    case (?existingFiles) existingFiles;
  };
}
```

### What does it do?

- **Purpose:**
  - Retrieves the file map (`UserFiles`) for a given user (`Principal`).
  - If the user does not have a file map yet, it creates a new one, stores it in the main `files` map, and returns it.
  - If the user already has a file map, it simply returns it.

### The `HashMap.get` Arguments

```motoko
HashMap.get(files, phash, user)
```

- **files:** The main state variable, a `HashMap` mapping `Principal` to `UserFiles`.
- **user:** The key you are looking up (the user's Principal).
- **phash:** The hash function used for the key type (`Principal`).

#### Where does `phash` come from?

- At the top of the file:
  ```motoko
  import { phash; thash } "mo:map/Map";
  ```
- This imports two hash functions:
  - `phash` is used for hashing `Principal` keys.
  - `thash` is used for hashing `Text` keys.

#### Why do you need to pass a hash function?

- Motoko's `HashMap` is generic and does not know how to hash every possible key type.
- When you use a `HashMap`, you must provide a hash function appropriate for the key type whenever you get, put, or remove items.
- For example:
  - When you use a `HashMap<Principal, ...>`, you use `phash`.
  - When you use a `HashMap<Text, ...>`, you use `thash`.

### Summary

- **`phash`** is a hash function for `Principal` keys, imported from `mo:map/Map`.
- You pass it to `HashMap.get` so the map knows how to hash the `user` key.
- This pattern is required in Motoko for all `HashMap` operations.

---
