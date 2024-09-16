# makoto

> Not under active development, but might be continued in the future

makoto is an attempt to create a stupid simple personal calendar and planning solution.
It takes a unique approach on "events" by instead operating on a fundamental unit of "partitions."
Partitions are chunks of time in a day that can be one-off or recurring depending on "partition rules."
This design allows for users to organize their days however they wish without being shackled by current planning solutions' opinions on what "events" are.

## Development
### Prerequisites
- Download [Node.js](https://nodejs.org), and [Rust](https://www.rust-lang.org/)
- Install the `tauri-cli` cargo binary by running `cargo install tauri-cli`

### Running the app
- `cargo tauri dev` to run the local development server and webview app

## Feature log
- [x] Configuration through YAML file w/ automatic (de)serialization
- [x] Toast notification error handling
- [x] Custom or preset theming
- [ ] Partition builder
- [ ] Calendar view
- [ ] Sidebar navigation
