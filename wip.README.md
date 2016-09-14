# react-mobiledoc-editor

![Build status](https://circleci.com/gh/upworthy/react-mobiledoc-editor.svg?style=shield&circle-token=2ddb4e2cbcff9b2897e10f343f92a5f53c826c33)
![Dependency status](https://david-dm.org/upworthy/react-mobiledoc-editor.svg)

A Mobiledoc editor written using React and
[Mobiledoc Kit](https://github.com/bustlelabs/mobiledoc-kit).

`react-mobiledoc-editor` supports the creation of
[Mobiledoc Cards](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md)
as React components. For existing React projects, this makes it possible to
build React components once and share them between Mobiledoc and other contexts.

## Installation

```sh
npm install react-mobiledoc-kit
```

**Please note:** MobiledocKit and React are specified as peer dependencies,
and **will not** be automatically installed. If you haven't already, please
add `mobiledoc-kit` (>= 0.10.11), `react` (>= 15.0.0), and `react-dom` (>=
15.0.0) to your `package.json`.

## Usage

This package contains a number of React components suitable for building
your own editor UI.

* [`Container`](#container)
* [`Editor`](#editor)
* [`Toolbar`](#toolbar)
* [`SectionButton`](#sectionbutton)
* [`MarkupButton`](#markupbutton)
* [`LinkButton`](#linkbutton)

The most basic usage with standard toolbar and empty editor is:

```jsx
<Container>
  <Toolbar />
  <Editor />
</Container>
```

Read on for how to provide more typical configurations to each component.

#### `<Container>`

This is the top-level component, which _must_ be present and wrap the rest
of your editor UI. It accepts the configuration for your mobiledoc editor
instance and is responsible for establishing the [React
context](https://facebook.github.io/react/docs/context.html) which enables
the other editor components to work together.

Please note that by itself, `Container` only renders an empty root-level
component. At a minimum, you'll need to include an `Editor` component inside
it. In addition to the Mobiledoc-specific properties listed below, any known
React props (like `className`) will be passed to the root-level component.

The `Container` component accepts these Mobiledoc-specific props:

- `mobiledoc`: A Mobiledoc to be edited.
- `cards`: An array of available cards for use by the editor. Jump to the
  section on [Card-based components](#component-based-cards) for more detail
  on how to create cards as React components.
- `atoms`: An array of available atoms for use by the editor.
- `spellcheck`: Boolean.
- `autofocus`: Boolean.
- `placeholder`: A string to use as the placeholder text when the mobiledoc
  is blank.
- `options`: A hash of additional options that will be passed through to the
  Mobiledoc editor constructor.
- `serializeVersion`: A string representing the mobiledoc version to serialize
  to when firing the `onChange` action. Defaults to `0.3.0`.
- `onChange`: A callback that will fire whenever the underlying document
  changes. Use this to persist and/or serialize your mobiledoc to another
  format as it's being edited. Will be called with the serialized mobiledoc.
- `willCreateEditor`: A callback that fires when the Mobiledoc editor instance
  is about to be created. Takes no arguments.
- `didCreateEditor`: A callback that fires once the Mobiledoc editor instance
  has been created. Will be called with the editor instance and may be used
  to configure it further.


#### `<Editor>`

The `Editor` component is the actual editor interface. In its most basic form
it renders an empty editor with no toolbar. It accepts no Mobiledoc-specific
props, but will respect any known React props like `className` or `onDrop`.
(See the [How To](https://github.com/upworthy/react-mobiledoc-editor/wiki/How-To#drag--drop)
page in the wiki for more information on drag & drop.)

#### `<Toolbar>`

Creates a toolbar with the standard set of buttons. To customize the button
set, see the [How To](https://github.com/upworthy/react-mobiledoc-editor/wiki/How-To#customizing-the-toolbar)
page in the wiki.

#### `<SectionButton>`

Creates a button that, when clicked, toggles the supplied tag on the section
under the editor cursor.

Takes one required property: `tag`, the name of the section tag. Accepts any
known React props, like `className` or `title`. The returned `<button>`
component will have a class of `active` when the corresponding tag is active
under the editor cursor.

```jsx
<SectionButton tag="h2" />
```

Alternately, custom child node(s) may be yielded to render something other
than the tag name within the button:

```jsx
<SectionButton tag="ul">
  List
</SectionButton>
```

#### `<MarkupButton>`

Creates a button that, when clicked, toggles the supplied tag on the selected
range in the editor.

Takes one required property: `tag`, the name of the markup tag. Accepts any
known React props, like `className` or `title`. The returned `<button>`
component will have a class of `active` when the corresponding tag is active
under the editor cursor.

```jsx
<MarkupButton tag="em" />
```

Alternately, custom child node(s) may be yielded to render something other
than the tag name within the button:

```jsx
<MarkupButton tag="strong">
  Bold
</MarkupButton>
```

#### `<LinkButton>`

Creates a button that, when clicked, toggles the presence of a link on the
selected range in the editor. User will be prompted for a URL if necessary.

Accepts any known React props, like `className` or `title`. The returned
`<button>` component will have a class of `active` when an anchor tag is
active under the editor cursor.

```jsx
<LinkButton />
```

Alternately, custom child node(s) may be yielded to render something other
than the default label on the button:

```jsx
<LinkButton>
  <span className="icon icon-link" />
</LinkButton>
```

## Component-based Cards

Mobiledoc supports "cards", blocks of rich content that are embedded in a
post. For specifics of the underlying card API, please see the [Mobiledoc Card
documentation](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md).

`react-mobiledoc-editor` comes with a helper for using your own React
components as the display and edit modes of a card.

To wrap your own component in the Card interface, simply call `classToDOMCard`
on it:

```jsx
import { Component } from 'react';
import { classToDOMCard } from 'react-mobiledoc-editor';

class MyComponent extends Component {
  render() {
    let { isInEditor } = this.props;
    let text = isInEditor ? "This is the editable interface"
                          : "This is the display version";
    return <p>{text}</p>;
  }
}
MyComponent.displayName = 'MyComponent';

const MyComponentCard = classToDOMCard(MyComponent);
```

Please note that if your component does not implement a display name, you'll
need to provide your own card name to `classToDOMCard`:

`const MyCard = classToDOMCard(NamelessComponent, 'MyCardName');`

Once your components have been wrapped in the card interface, they can be
passed to a `<Container>` component via the `cards` prop, like any other card.

Card-based components will be instantiated with the following
mobiledoc-specific props:

- `payload`: The payload for this card. Please note the payload object is
  disconnected from the card's representation in the serialized mobiledoc; to
  update the payload as it exists in the mobiledoc, use the `save` callback.
- `edit`: A callback for toggling this card into edit mode (no-op if the card
  is already in edit mode).
- `save`: A callback which accepts a new payload for the card, then saves that
  payload to the underlying mobiledoc and toggles the card back into display
  mode. Can optionally be passed `false` as an extra argument to avoid toggling
  to display mode.
- `cancel`: A callback for toggling this card to display mode without saving (a
  no-op if the card is already in display mode).
- `remove`: A callback for removing this card entirely.
- `name`: The name of this card.
- `postModel`: A reference to this card's model in the editor's abstract tree.
  This may be necessary to do programmatic editing.
- `isInEditor`: A bool indicating if the card is displayed inside an editor
  interface or not.
- `isEditing`: A bool indicating if the card is in Edit mode or not.

## Developing `react-mobiledoc-editor`

_tktktk_
