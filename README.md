# generator-rn-cv
> An opinionated React Native generator


## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-native-module using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-rn-cv
```

## Usage

### Create a new project

```bash
yo rn-cv
```

### Create a component

```bash
yo rn-cv:component
```

1. What kind of component do you want?
  - `Component` This choice lets you create a regular component only which will be accessible to its parent and working directory.
  - `Shared Component`  This choice creates a shared component which will be reachable throughout all your components.
2. Will it be a main component or subcomponent?
  - `Main Component`  This will create a container component that will have its own subcomponents and its own directory.
  - `Subcomponent`  This will create a subcomponent that can be used by its parent.
3. Where do you want it?
  - Here you can select the directory you want your component in
4. What will be the name of your component?
  - Input the name of the component. This will turn the format you used to PascalCase. (e.g: 'home view' -> 'HomeView')


## License

MIT © [codeventure](http://codeventure.com.tr)
