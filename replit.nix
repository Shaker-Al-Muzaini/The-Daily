{ pkgs }: {
    deps = [
        pkgs.nodejs_18
        pkgs.php82
        pkgs.composer
        pkgs.sqlite
    ];
    env = {
        PHP_VERSION = "8.2";
        NODE_VERSION = "18";
    };
}