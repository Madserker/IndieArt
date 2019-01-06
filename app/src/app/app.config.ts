export class AppConfig {
    /**
     *
     * change API_ENDPOINT according to your server's api url
     * change SOCKET_IO according to your server's socket url
     * 
     * public static API_ENDPOINT='TO_YOUR_SERVERS_API_URL';
     * public static SOCKET_IO='TO_YOUR_SERVERS_SOCKET_URL';
     * 
     * Here is an easy example
     */
    public static API_ENDPOINT='http://localhost:8000/api';

    //change if we move to other pc
    public static SOCKET_IO='http://192.168.1.66:3000/';

}