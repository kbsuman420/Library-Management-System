import dotenv from "dotenv"
import dns from "dns"

dotenv.config()

// Override DNS servers to Google and Cloudflare DNS to prevent querySrv ECONNREFUSED errors
// caused by Node's internal DNS resolver encountering loopback (127.0.0.1) or invalid local servers.
dns.setServers(["8.8.8.8", "1.1.1.1"])
