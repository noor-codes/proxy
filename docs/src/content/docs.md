# Self-Hosted Proxy Documentation

## Overview

A lightweight and secure proxy server that you can host on your own infrastructure. This self-hosted solution helps you bypass CORS restrictions and provides a secure way to make HTTP requests from your frontend applications, all while maintaining complete control over your data.

## Features

- **🔒 Security First**: Built-in HTTPS support and request validation
- **📨 Header Control**: Full control over header forwarding and manipulation
- **🔄 Flexible Methods**: Support for all HTTP methods (GET, POST, PUT, DELETE, etc.)
- **📦 Request Handling**: Efficient request body processing and forwarding
- **❌ Error Control**: Customizable error handling and logging

## Quick Start

### Installation

1. Clone the repository:

```bash
git clone https://github.com/noor-codes/proxy.git
cd proxy
```

2. Install dependencies and run the project:

```bash
# Install dependencies
yarn

# Build the project
yarn build

# Start the server
yarn start
```

### Usage in Your Application

Once you have your proxy server running, you can use it in your application:

```javascript
const proxyUrl = 'http://localhost:3000' // Your self-hosted proxy URL
const targetUrl = 'https://api.target.com/data'

// Using fetch
fetch(`${proxyUrl}/${targetUrl}`)
  .then((response) => response.json())
  .then((data) => console.log(data))

// Using axios
import axios from 'axios'

axios.get(`${proxyUrl}/${targetUrl}`).then((response) => console.log(response.data))
```

## Contributing

Thank you for considering contributing to our project! We welcome contributions from everyone.

<br/>

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🔍 Review pull requests
- 💻 Submit your own code changes

<br/>

### Getting Started

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed guidelines, please see our [Contributing Guide](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
