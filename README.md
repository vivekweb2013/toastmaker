<p align="center">
  <a href="https://vivekweb2013.github.io/toastmaker/">
    <img src="https://raw.githubusercontent.com/vivekweb2013/toastmaker/master/docs/favicon.svg" width="250">
  </a>

  <p align="center">
    Small JavaScript Library for Showing Toast Notifications
    <br>
    <a href="https://vivekweb2013.github.io/toastmaker/"><strong>Demo & Documentation</strong></a>
  </p>
</p>

<br>

# ToastMaker

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vivekweb2013/toastmaker/npm-build?color=forestgreen)](https://github.com/vivekweb2013/toastmaker/actions?query=workflow%3Anpm-build)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=alert_status)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=coverage)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=code_smells)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/toastmaker)](https://bundlephobia.com/result?p=toastmaker)
[![npm](https://img.shields.io/npm/v/toastmaker)](https://www.npmjs.com/package/toastmaker)
[![GitHub](https://img.shields.io/github/license/vivekweb2013/toastmaker?color=blue)](LICENSE)

Toast Maker is a simple and very lightweight javascript library for showing toast notification messages on web page. It provides multiple configurations to customize the toast styling(font, background, size ... anything), duration, position etc.

## Demo

[ToastMaker Demo](https://vivekweb2013.github.io/toastmaker/)

## Features

* [Small Footprint](#bundle-size)
* Responsive
* Customizable Styling
* Can be Used With Vanilla Javascript, NPM Project or ReactJS Project
* Works With - IE10, IE11, Edge, Chrome, Firefox, Safari, Opera
* No Dependencies
* 100% Code Coverage

## Include toastmaker library in your project

### Install toastmaker module in npm project
You can install `toastmaker` module in your npm project using npm or yarn.

```
npm install --save toastmaker
```

or

```
yarn add toastmaker -S
```

After adding the `toastmaker` module to your project, import it in your script as shown below.
```
import ToastMaker from 'toastmaker';
import "toastmaker/dist/toastmaker.css";
```

**NOTE:** The `toastmaker.css` is the default css file. If you want you can refer to it and create your own css file and import it instead of this default one.

### Include toastmaker library in a plain html
ToastMaker can also be used with plain vanilla javascript project. Just add the minified javascript and css file in you main html and you can start using it inside the javascript.

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/toastmaker/dist/toastmaker.min.css">

<script type="text/javascript" src="https://unpkg.com/toastmaker/dist/toastmaker.min.js"></script>
```
If you want you can download the bundle from the [releases section](https://github.com/vivekweb2013/toastmaker/releases/latest), then include & reference the files locally rather than using the cdn links.

## How to use?
Using `ToastMaker` is very simple. Create a toast by passing the text message, as shown in below example

```javascript
  ToastMaker('Hi There!');
```

If you want to change the default timeout, position, styling etc you can pass the optional arguments. Refer below example.

```javascript
  ToastMaker('Hi There!', 2000,  {
    styles: { fontSize: '18px', backgroundColor: 'green' },
    classList: ['custom-class', 'other-custom-class'],
    align: 'right',
    valign: 'top'
  });
```

### Use your own styles and css classes

You can specify multiple styles or your own css classes using `styles` and `classList` options respectively. This is useful in case you want to change the background, font-size, color, padding, border, ... and a lot of other styling as per your requirement.

```javascript
  ToastMaker("Hi There!", 2000,  {
    styles: { fontSize: "15px" },
    classList: ["custom-class"]
  });
```

For more examples, check out the live demo page - [ToastMaker Demo](https://vivekweb2013.github.io/toastmaker/)

## Options

| Option | Type / Allowed Values | Description | Default | Mandatory?
|-----------------|-----------------|------------------|-----------------|-----------------|
| `text` | string | Text message to be shown in toast | N/A | Yes |
| `timeout` | number | Duration (In milliseconds) for which the toast should be displayed | `3000` | No |
| `styles` | object | Object containing style properties to be applied to toast | N/A | No |
| `classList` | array | Array of css classes to be applied to toast | N/A | No |
| `align` | `'left'` <BR /> `'center'` <BR /> `'right'` | Horizontal alignment for toast | `'center'` | No |
| `valign` | `'top'` <BR /> `'bottom'` | Vertical alignment for toast | `'bottom'` | No |

**Note:** All options except `text` and `timeout` needs to be wrapped inside an object and passed to the `ToastMaker` as the 3rd argument. 

Refer [How to use?](#how-to-use) section to know how these options should be used with the `ToastMaker` function.


## Bundle size

|              |                size |                gzip |
| :----------- | ------------------: | ------------------: |
| toastmaker   |  ![toastmaker_size] |  ![toastmaker_gzip] |
| toastify-js  | ![toastify-js_size] | ![toastify-js_gzip] |
| toastr       |      ![toastr_size] |      ![toastr_gzip] |
| noty         |        ![noty_size] |        ![noty_gzip] |

[toastmaker_size]: https://img.shields.io/bundlephobia/min/toastmaker
[toastmaker_gzip]: https://img.shields.io/bundlephobia/minzip/toastmaker
[toastify-js_size]: https://img.shields.io/bundlephobia/min/toastify-js
[toastify-js_gzip]: https://img.shields.io/bundlephobia/minzip/toastify-js
[toastr_size]: https://img.shields.io/bundlephobia/min/toastr
[toastr_gzip]: https://img.shields.io/bundlephobia/minzip/toastr
[noty_size]: https://img.shields.io/bundlephobia/min/noty
[noty_gzip]: https://img.shields.io/bundlephobia/minzip/noty

## Versioning

For the versions available, see the [tags on this repository](https://github.com/vivekweb2013/toastmaker/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

