interface BaseHeaders {
    [key: string]: string | undefined;
}

export interface Headers extends BaseHeaders {
    Authorization?: string,
    ["Content-Type"]?: "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded" | "text/plain" | string;
    'Accept'?: string;
    'Accept-Encoding'?: 'gzip' | 'compress' | 'deflate' | 'br' | 'identity' | '*';
    'Accept-Language'?: string;
    'Cache-Control'?: 'no-cache' | 'no-store' | 'max-age' | 'max-stale' | 'min-fresh' | 'no-transform' | 'only-if-cached' | string;
    'DNT'?: string; // Do not track: "1" (do not track) or "0" (track)
    'Origin'?: string;
    'User-Agent'?: string;
    'Pragma'?: string; // can be used with HTTP/1.0 caches
    'Referer'?: string; // tells the server about the url of the page that referred this one
    'TE'?: string; // Transfer encodings the user agent is willing to accept: 'trailers' , 'chunked' or 'compress', 'deflate', 'gzip'
    'Upgrade-Insecure-Requests'?: string;
    'X-Content-Type-Options'?: "nosniff" | string;
    'X-Frame-Options'?: "DENY" | "SAMEORIGIN" | "ALLOW-FROM" | string;
    'X-UA-Compatible'?: string; // For instructing IE to use the latest rendering engine or using chrome frame IE plugin
    'X-XSS-Protection'?: string; //Related to Cross site scripting security in IE8+
    'If-Modified-Since'?: string; // Conditional GET requests
    'If-None-Match'?: string; // Conditional GET requests
    'If-Range'?: string; // If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity
    'Max-Forwards'?: string; // Limit the number of times the message can be forwarded through proxies or gateways
    'Proxy-Authorization'?: string; // Authorization credentials for connecting to a proxy
    'Range'?: string; // Request only part of an entity
    'Via'?: string; // Informs the server of proxies through which the request was sent
    'Warning'?: string; // General warning information about possible problems
    'Expected'?: string; // The client expects the server to adhere to certain behavior
    'Forwarded'?: string; // Contains information from the client-facing side of proxy servers
    'If-Unmodified-Since'?: string; // Only send the response if the entity has not been modified since a specific time
    'Content-Security-Policy'?: string; // Helps prevent attacks such as Cross Site Scripting (XSS) and other code injection attacks
    'Cookie'?: string; // Used to send cookies from the client to the server
    'Set-Cookie'?: string; // Used by the server to send cookies to the client
    'Strict-Transport-Security'?: string; // Security feature to ensure user agent only communicates over HTTPS
    'Access-Control-Allow-Origin'?: string; // For Cross-origin Resource Sharing (CORS)
    'Access-Control-Allow-Credentials'?: string; // For CORS - true to tell browser to include cookies with requests
    'Access-Control-Allow-Headers'?: string; // For CORS - which HTTP headers are allowed
    'Access-Control-Allow-Methods'?: string; // For CORS - which HTTP methods are allowed
    'Access-Control-Expose-Headers'?: string; // For CORS - which headers are safe to expose to the API
    'Access-Control-Max-Age'?: string; // For CORS - defines the time for which the preflight request will be cached
    'Vary'?: string; // Tells downstream proxies how to match future request headers to choose whether the cached response can be used.
    'Etag'?: string; // For cache re-validation
    'Last-Modified'?: string; // The last time the resource was modified
    'Content-Encoding'?: string; // The type of encoding used on the data
    'Expires'?: string; // Tells when the client should consider the response outdated
    'Public-Key-Pins'?: string; // Enables HTTP Public Key Pinning (HPKP), a security feature that tells the client to use only certain public keys to communicate with your server in the future
    'Refresh'?: string; // Used to redirect a webpage or refresh the page after a certain number of seconds
    'Retry-After'?: string; // If an entity is temporarily unavailable, this instructs the client to try again after a certain period of time
    'Server'?: string; // Contains information about the software being used by the origin server
    'X-Permitted-Cross-Domain-Policies'?: string; // Specifies the policy for handling requests from a Flash or Silverlight.
    'X-Powered-By'?: string; // Information about what powers the website/web application.
    'Content-Location'?: string; // The direct link to the resource of the current response
    'Content-Disposition'?: string; // Directives to be followed by the client when presenting the content
    'Host'?: string; // Specifies the meeting place host
    'Link'?: string; // Used for linking related resources
    'Location'?: string; // The URL of a redirected page
    'MIME-Version'?: string; // Specifies the version of MIME protocol that the website is using
    'Proxy-Authenticate'?: string; // Contains the credentials to authenticate a user agent
    'Status'?: string; // Contains the status of the request
    'Age'?: string; // The age of the resource being returned, in seconds since it was last fetched
    'Content-Length'?: string; // The length of the body section in octets (8-bit bytes)
    'Content-Range'?: string; // Where in the full resource this partial message belongs
    'Date'?: string; // The date and time according to the origin server's clock
    'Transfer-Encoding'?: string; // The form of encoding used to safely transfer the entity
    'Allow'?: string; // Lists the set of methods supported by the resource
    'SourceMap'?: string; // Specifies the location of the source map
    'Alt-Svc'?: string; // Specifies alternative services available for accessing a resource
    'Remote-Address'?: string; // The IP address of the client that sent the request
    'X-Correlation-ID'?: string; // Commonly used for tracing a chain of requests/responses in log files
    'X-Request-ID'?: string; // Can be used to trace a single user journey
    'X-Request-Start'?: string; // Can be used to measure request response times
    'X-CSRF-Token'?: string; // Used to prevent cross-site request forgery
    'X-Download-Options'?: string; // Can be used to indicate that the browser should not display the option to "Open" a file that has been downloaded, but instead only save it.
}
