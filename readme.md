

# React-Native Html to markdown converter

A simple html to markdown converter that converts html to markdown, using no
dependencies.   Perfect for react-native.

My own use case for this is quite simple.  If it doesn't quite fit yours, PRs are welcome!

## Tags Supported

1. h1,h2,h3,h4,h5,h6
2. p
3. ul,ol
4. blockquote,
5. pre
6. bold,strong
7. italic,em
8. a 
9. br

## Converting Html Documents

```javascript
import htmlToMd from "react-native-html-to-markdown";
const markdown = htmlToMd('<h2> Happy Journey </h2>');
```

## Extending to add your own formatters.

```javascript
import htmlToMd, {addFormatter} from "react-native-html-to-markdown";
addFormatter('name', function (...))

```


## credits
This was forked from https://github.com/thetutlage/html-to-markdown, which was 
a good start but is no longer maintained.


