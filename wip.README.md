# react-mobiledoc-editor

![Build status](https://circleci.com/gh/upworthy/react-mobiledoc-editor.svg?style=shield&circle-token=2ddb4e2cbcff9b2897e10f343f92a5f53c826c33)
![Dependency status](https://david-dm.org/upworthy/react-mobiledoc-editor.svg)

A Mobiledoc editor written using React and
[Mobiledoc Kit](https://github.com/bustlelabs/mobiledoc-kit).

react-mobiledoc-editor supports the creation of
[Mobiledoc Cards](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md)
as React components. For existing React projects, this makes it possible to
build cards natively and potentially reuse them in other non-Mobiledoc contexts.

## Installation

_tktk_

## Usage

This package contains a number of React components suitable for building
your own editor UI.

* [`Container`](#Container)
* [`Editor`](#Editor)
* [`SectionButton`](#SectionButton)
* [`MarkupButton`](#MarkupButton)
* [`LinkButton`](#LinkButton)
* [`Toolbar`](#Toolbar)

The most basic usage with standard toolbar and empty editor is:

```js
<Container>
  <Toolbar />
  <Editor />
</Container>
```

Read on for more typical configurations.

### `<Container />`

This is the top-level component, which must be present and wrap the rest of
your editor UI. It accepts the configuration for your mobiledoc editor
instance and is responsible for establishing the
[React context](https://facebook.github.io/react/docs/context.html) which
enables the other editor components to work together.

On its own it only renders an empty root-level component; you must tell it
what subcomponents to render, and how. In addition to the Mobiledoc-specific
properties listed below, any known React props (like `className`) will be
passed to the root-level component.

The `Container` component accepts these Mobiledoc-specific props:

- _tktktk_

### `<Editor />`

The `Editor` component is the actual editor interface. In its most basic form
it renders an empty editor with no toolbar. It accepts no Mobiledoc-specific
props, but will respect any known React props like `className` and `onDrop`
(see the (How To)[https://github.com/upworthy/react-mobiledoc-editor/wiki/How-To#drag--drop]
page in the wiki for more information on drag & drop.)


