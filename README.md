# ToastMaker

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vivekweb2013/toastmaker/npm-build?color=forestgreen)](https://github.com/vivekweb2013/toastmaker/actions?query=workflow%3Anpm-build)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=alert_status)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=coverage)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vivekweb2013_toastmaker&metric=code_smells)](https://sonarcloud.io/dashboard?id=vivekweb2013_toastmaker)

[![npm](https://img.shields.io/npm/v/toastmaker)](https://www.npmjs.com/package/toastmaker)
[![GitHub](https://img.shields.io/github/license/vivekweb2013/toastmaker?color=blue)](LICENSE)

Toast Maker is a simple and very lightweight library for showing toast message on web page. It provides multiple configurations to customize the toast styling(font, background, size ... anything), duration, position etc.


## Features

* Small footprint
* Customizable styling
* Can be used in Vanilla JavaScript or NPM project
* Works with - IE10, IE11, Edge, Chrome, Firefox, Safari, Opera

## Installation

#### NPM or Yarn Project
Follow the steps mentioned below to install the library in NPM project.

```
npm install --save toastmaker
```

or

```
yarn add toastmaker -S
```

After adding the `ToastMaker` module to your project, import the ToastMaker in your script as shown below.
```
import ToastMaker from 'toastmaker';
import "toastmaker/dist/toastmaker.css";
```

**NOTE:** The `toastmaker.css` is the default css file. Importing `toastmaker.css` is optional, if you want you can create your own css file and import it instead of this default one.

#### Plain Vanilla JavaScript
You can also use this library in Plain JavaScript and HTML. Follow the steps mentioned below to include ToastMaker js and css inside plain HTML/JS
```html
<link rel="stylesheet" type="text/css" href="./toastmaker/dist/toastmaker.min.css">

<script type="text/javascript" src="./toastmaker/dist/toastmaker.min.js"></script>
```

## How to use?
Using `ToastMaker` is very simple. Create the toast with some message, as shown in below example

```javascript
  ToastMaker('Hi There!', 2000,  {
    styles: { fontSize: '18px', backgroundColor: 'green' },
    classList: ['custom-class', 'other-custom-class'],
    align: 'right',
    valign: 'top'
  });
```

You can exclude the optional arguments, since the only mandatory argument is text, you can simply create the toast with minimal code as shown below.

```javascript
  ToastMaker('Hi There!');
```

## Options

| Option | Type / Allowed Values | Description | Default | Mandatory?
|-----------------|-----------------|------------------|-----------------|-----------------|
| `text` | string | Text message to be shown in toast | N/A | Yes |
| `timeout` | number | Duration (In milliseconds) for which the toast should be displayed | `3000` | No |
| `styles` | object | Object containing style properties to be applied to toast | N/A | No |
| `classList` | array | Array of css classes to be applied to toast | N/A | No |
| `align` | string <BR />`(left,center,right)` | Horizontal alignment for toast | `center` | No |
| `valign` | string <BR />`(top,bottom)` | Vertical alignment for toast | `bottom` | No |


### Use your own styles/classes

You can add your own styles or css classes using `styles` and `classList` options. This is useful in case you want to change background, font-size, color etc styling as per your requirement.

```javascript
  ToastMaker("Hi There!", 2000,  {
    styles: { fontSize: "15px" },
    classList: ["custom-class"]
  });
```

## Versioning

For the versions available, see the [tags on this repository](https://github.com/vivekweb2013/toastmaker/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
