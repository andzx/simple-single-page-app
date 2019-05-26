# A simple single page app
A simple single page app boilerplate.
Written in plain JavaScript, comes with a router and includes a few example views.

# Sample htaccess file
An htaccess file is required when opening a specific page from outside the app.

Sample htaccess file contents:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
