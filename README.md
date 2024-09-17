# makoto

> Back under active development :D

makoto is an attempt to create a stupid simple personal calendar and planning solution.
It takes a unique approach on the typical "events" by instead operating on a fundamental unit of "partitions."
Partitions are simply chunks of time in a day.
But, these partitions can be created to be one-off or configured to be recurring based on a set of rules that you configure.
They can also be used purely for organizational sake; you can create a partition for mornings, and then create subpartitions for eating breakfast and meditating.
This design allows for users to organize their days however they wish without being shackled by current planning solutions' opinions on what "events" are.

## Development
### Prerequisites
- Download [Node.js](https://nodejs.org), and [Rust](https://www.rust-lang.org/)
- Install the `tauri-cli` cargo binary by running `cargo install tauri-cli`

### Running the app
- `npm install` to download the frontend dependencies
- `cargo tauri dev` to run the local development server and webview app

## Feature log
- [x] Configuration through TOML file w/ automatic (de)serialization
- [x] Toast notification error handling
- [x] Custom or preset theming
- [ ] Partition builder (WIP)
- [ ] Calendar view (WIP)
- [ ] Cross-view navigation (WIP)
- [ ] Multiple Calendar profiles
- [ ] Setting configuration through UI

## Screenshots as of 2024-09-16
![image](https://github.com/user-attachments/assets/10233193-6763-4ed9-aea5-a926b60d63da)
![image](https://github.com/user-attachments/assets/4f3e6399-2bd7-4805-b1b3-9342ad6bdfec)
