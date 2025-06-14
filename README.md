# react_typescript
On the basis of "EveryDay Karma Youtube" typescript playlist, [Link](https://www.youtube.com/watch?v=XRvHU_C2gIE&list=PL4njvVBDLL22c3ui_Jru1VjGIT3fHUX2h&index=7), this entire project will be built using React and TypeScript.
## Things to know before starting..
- This project is covering 7th video of the series, so to understand the code, you can go to my github repository [Link](https://github.com/Greshanris/learn_typescript) for the previous video notes which I made.
- The notes is based on "EveryDay Karma Youtube" typescript [playlist](https://www.youtube.com/watch?v=egmCargS2TU&list=PL4njvVBDLL22c3ui_Jru1VjGIT3fHUX2h), and this entire project is based on 7th video to understand the code and learn "how to use TypeScript with React".

## So, Let's get started with the code...
- First, create a new React project with TypeScript template using the command:
```powershell
npm create vite@latest
```
- Then, select the options as follows:
  - Project name: `react_typescript`
  - Select a framework: `React`
  - Select a variant: `TypeScript`
![1_creating_react_project](pictures/1_creating_react_project.png)
- Then, navigate to the project directory, and install the dependencies:
```powershell
cd react_typescript
npm install
```
- After that, we can start the development server using the command:
```powershell
npm run dev
```
- Now, change the ``package.json`` file and insted of just ``dev``, write ``start:dev`` in the scripts section.

### React Types
#### JSX.Element
- Now, after all that, we removed the default return statement inside ``App.tsx`` and only included fragment, which is ``<></>``.
- We saw, what the React types are inferred by default.
- The type was inferred as ``JSX.Element``. We can also explicitly define the type of the return statement as ``JSX.Element``, and it will work the same way. 
- This means that the return type of a React component is always ``JSX.Element``.

#### Note
- So, if the React component is automatically inferred as certain type. For instance, if we write:
```typescript
let a = 10; # automatically inferred as let a: number;
```
- So, we do not need to explicitly define the type in these cases, and it will just be a waste of time to explicitly define these types.

### Let's create a simple component, and we will see by passing different types of props, then how we can define the types of props in TypeScript.
- We created a card component inside the ``src`` folder.
```typescript
function Card() {
  return (
    <div>
      Card
    </div>
  )
}

export default Card
```
- Then, we used this component inside the ``App.tsx`` file with ``<Card />``.
- Now, we want to pass some props to this component like ``backgroundColor``.
```typescript
<Card backgroundColor="red" />
```
- Now, TypeScript works here and will throw an error saying that ``backgroundColor`` is not defined in the props of the ``Card`` component.
- In jsx, it will not show any error, but in TypeScript, it will throw an error saying that ``Property 'backgroundColor' does not exist on type 'IntrinsicAttributes & CardProps'``.
- Now, if we want receive this prop, and we include ``props`` as an argument in the ``Card`` component.
```typescript
function Card(props) {
  return (
    <div>
      Card
    </div>
  )
}

export default Card
```
- We will remove the error, but we are seeing that ``props`` is inferred as ``any`` type, which is not what we want.
- Now, we know that the any props, we passed to the component, is passed as an ``object``.
- So, we can define the type of the props as an object with a property ``backgroundColor`` of type ``string``.
- But, still, we see there is an red underline under the ``props`` variable. It is because we are not using the ``props`` variable inside the component in ``Card.tsx`` file.
```typescript
function Card(props: { backgroundColor: string }) {
  return (
    <div>
      Card
      {props.backgroundColor}
    </div>
  )
}

export default Card
```
- Now, if we change the ``string`` type to ``number``, we will see that the error will be thrown in the ``App.tsx`` file. This is the use of TypeScript, where we can minimize the errors in the code by defining the types of the props.
- If we want to define the props as the same name as the props that was passed, we can use destructuring.
```typescript
function Card({ backgroundColor }: { backgroundColor: string }) {
  return (
    <div>
      Card
      {backgroundColor}
    </div>
  )
}
```
- Now, what if we want to pass multiple props to the component. Here, we used ``height`` as a additional prop, and we can define the type of the props like this:
```typescript
function Card({ backgroundColor, height }: { backgroundColor: string, height: number }) {
  return (
    <div>
      Card
      {backgroundColor}
      {height}
    </div>
  )
}
```
- Now, if we want to know the props of an component, which is already defined in the component, and we just donot know, then we can use ``ctrl + space`` ti see the props of the component.
- Again, we added another prop called ``size``.
- But, destructuring the props will be a lengthy process if we have multiple props, so we can define the type of the props in this way:
  - first, cut the types of the props from the destructured object which is ``{ backgroundColor: string, height: string, size: string }``
  - Declare a type called ``CardProps`` and paste the types inside it.
  - The, we can use this type in the destructuring of the props like this:
```typescript
type CardProps = { 
    backgroundColor: string, 
    height: string, 
    size: string 
}

function Card({backgroundColor, height, size}: CardProps) {
  return (
    <div>
      Card
      {backgroundColor}
      {height}
      {size}
    </div>
  )
}

export default Card
```
- We also see ``interface`` in TypeScript, which is used to define the types of the props like this:
```typescript
interface ICardProps {
    backgroundColor: string, 
    height: string, 
    size: string 
}
```
- we can any of the above method to define the types of the props, but the ``interface`` is more powerful than the ``type`` because we can extend the interface and use it in other components. 
- And, ``type`` also has its own advantages. For instance, if we use ``interface``, we can only make objects, but if we use ``type``, we can make unions, intersections, and other types as well. Like this:
```typescript
type age = string | number;
type person = {
    name: string,
    age: age
}
```
- Also, we can make parameter optional in the props by adding ``?`` after the property name. Like this:
```typescript
type CardProps = { 
    backgroundColor: string, 
    height: string, 
    size?: string 
}
```
- But, we do need to remove the ``size`` which is an optional prop from the destructuring of the props in the component.
```typescript
type CardProps = { 
    backgroundColor: string, 
    height: string, 
    size?: string 
}

function Card({backgroundColor, height}: CardProps) {
  return (
    <div>
      Card
      {backgroundColor}
      {height}
    </div>
  )
}

export default Card
```
#### Typescript Benefit on using Type based functions
- Earlier we declared a types on props and used it in component like this ``{backgroundColor}``.
- Before that, if we passed only ``props: CardProps`` where CardProps is a type, then, we used something like ``{props.backgroundColor}`` to use the component.
- Now, here, TypeScript gives benefit on using properties of ``string``, or ``array`` or ``number``.
- When we use ``.`` after the ``backgroundColor``, we will only get ``string`` related functions because earlier we declared ``backgroundColor`` as string type.
- Now, on the same note, we can declare union types for only two or three options. For instance, ``backgroundColor: "blue" | "green"`` while declaring types in ``Card.tsx``. Now, when we pass the props in ``<Card />`` component, then we will only have two options which will be given at the time of typing it, which further reduces potential errors.

#### So, what if we want to pass a function in the props?
- To pass the function in the props, we need to define it in argument of the component we are using which was Card component.
- Let's declare function as ``doSomething`` function that returns ``string``.
- Now, we declared that function in ``App.tsx``, and we need to pass it as a props in ``Card`` component like ``<Card propFunctionName = {doSomething}} />``.
- Now, we need to pass it in props and declare it's types.
- Now, for declaring types of the function, we declare what type it returns, and what type it takes as an parameter types.
- So, when declaring types:
```typescript
type CardProps = { 
    backgroundColor: "blue" | "green", 
    height: string, 
    size: string,
    doSomething: ()=> string, // here string type is returned.
}
```

#### In case of Default value in props
- Now, if we declare a default value in props just like this:
```typescript
function Card({ count = 2}) {
  return (
    <div>
      Card
      {count}
    </div>
  )
}

export default Card
```
- Then, we do not need to declare a type for it. TypeScript will automatically infer it based on the values which in this case is ``2``.
- So, even if we change the value by using props of Card component in ``App.tsx``
```tsx
import './App.css'
import Card from './Card';

function App() {

  return <>
    Hello World!
    <Card count={3}/>
  </>;
}

export default App
```
- We do not need to declare a type.
- But, if we declare multiple props, one with default value, and one with not like this:
```tsx
function Card({ name, count = 2}: {name: string, count: number}) {
  return (
    <div>
      Card
      {count}
      {name}
    </div>
  )
}

export default Card
```
- Then, we need to declare both types even though one has default value.

#### If we pass an object as props
- Let's assume we want to style ``Card`` component, and we are passing props in an object format like ``<Card style={{ backgroundColor="200px" }} />`` by declaring a props called ``style`` and inside ``style``, we are passing necessary styling. Then, How can we use it?
- For this, we need to define ``{{style}: cardProps}`` as an argument. We are destructuring ``style`` to use the props passed, or we are destructuring to use the styling.
- Then, we define the types also in object inside object, just like this:
```tsx
type CardProps = {
  style: {
    height: string,
    backgroundColor: string,
    padding: string
  }
}

function Card({ style }: CardProps) {
  return (
    <div>
      Card
      {style.height}
      {style.backgroundColor}
      {style.padding}
    </div>
  )
}

export default Card
```
- For every styling, like if we need ``margin``, to be used, we need to declare it in types inside style object as well.
- But, for this ``React`` provides it's own types, particularly for styling purposes, where we need ``css``.
- And, it is ``React.CSSProperties`` for whatever styling or css properties we need. Here, we can take this as an example:
```tsx
type CardProps = {
  style: React.CSSProperties;
}

function Card({ style }: CardProps) {
  return (
    <div>
      Card
      {style.height}
      {style.backgroundColor}
      {style.padding}
    </div>
  )
}

export default Card
```

#### When we write component ``<Card><Card/>`` instead of ``<Card/>``...
- Let's understand that we can use the React component in both ``<Card><Card/>`` as well as ``<Card />``.
- But, let's discuss the scenario where we can use component like this:
```tsx
<Card>Hello<Card/>
```
- Generally, we access "Hello" by using ``props.children`` But, how can we access here where we are using ``.tsx`` or ``typescript`` instead of ``.jsx``?:
```tsx
import './App.css'
import Card from './Card';

function App() {

  return <>
    Hello World!
    <Card>Hello</Card>
  </>;
}

export default App
```
- We can do this by destructuring children like this:
```tsx


function Card({ children }: {children: React.ReactNode}) {
  return (
    <div>
      Card
      {children}
    </div>
  )
}

export default Card
```
- Above, we destructured the ``children`` and gave its type as ``React.ReactNode`` .
- Now, if we use pass a ``text`` inside a ``div`` like this:
```tsx
function App() {

  return <>
    Hello World!
    <Card>
      <div>Rishav</div>
    </Card>
  </>;
}
```
- Then, also previous ``React.ReactNode`` will work, but still we can also give based on the element that is ``JSX.Element``.
```tsx
import type { JSX } from "react"


function Card({ children }: {children: JSX.Element}) {
  return (
    <div>
      Card
      {children}
    </div>
  )
}

export default Card
```
- Now, by giving ``JSX.Element`` as type, we can also enforce to use JSX element like this:
```tsx
function App() {

  return <>
    Hello World!
    <Card>
     <>{1}</> {/* JSX element */}
    </Card>
  </>;
}
```

#### Let's make another component called Button
- We create a button component and imported in ``App.tsx``
- We created a React Hook ``useState`` for counter to pass ``setCount`` as a props to change the value of the ``count``.
- Now, we passed it as a props, but we do not know the ``useState`` react hook types.
- Now, this component is here made to show how we can use those types?
- Now, if we hover over the ``useState``, then typescript infer the types as ``React.Dispatch<React.SetStateAction<number>>``, and yes, it is right now in complex form to understand.
- Basically, whenever we use ``useState(number)``, then, ``number`` is seen ``React.Dispatch<React.SetStateAction<number>>``, and whenver string is used, ``useState(string)`` , we see ``React.Dispatch<React.SetStateAction<string>>``.
- So, in simple terms, we can just copy it and paste it to use it like this:
```tsx
export const Button = ({setCount}: {setCount: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <button
    onClick={() => setCount((count) => count + 1)}
    >+</button>
  )
}
```
- For how to use the ``setCount``, we can just use event handling functions like ``onClick``, and to not use a function immediately we wrap it in arrow function ``() => {function to be called}``. Now, since, we wanted to increase value from previous value in React Hooks regarding state preservation, we use arrow function again ``(previous_value) => previous_value + 1``.

##### Suppose, we need to define button type, or need to created own props
- Button are of different types, like ``submit``, and there are numerous attributes we use, but do we need to define types for each one?
- We can do this instead:
```tsx
type ButtonProps = React.ComponentProps<"button">

export const Button = ({ type, autoFocus }: ButtonProps) => {
  return (
    <Button></Button>
  )
}
```
- So, in above code, we took use of React's one types for ComponentProps and we defined it as ``button``. ``React.ComponentProps<"button">``
- Now, if we need attributes of ``button`` element to be passed in Button component as props, then we can use it now by destructuring it.
```tsx
import './App.css'
import { Button } from './Button';

function App() {

  return <>
    <Button type="submit" autoFocus={true} value={"click"} />
  </>;
}

export default App
```
- Suppose, if we add our own additional props which could act as a attribute for html element like ``button``. Here, ``variant``.
```tsx
import './App.css'
import { Button } from './Button';

function App() {

  return <>
    <Button type="submit" autoFocus={true} value={"click"} variant="danger" />
  </>;
}

export default App
```
- Now, we can declare types using ``&``, and an object within which we can declare types like this:
```tsx
type ButtonProps = React.ComponentProps<"button"> & { variant: string}

export const Button = ({ type, autoFocus, variant }: ButtonProps) => {
  return (
    <Button className={variant}></Button>
  )
}
```
- Now, comes to the point about what if we want every attribute of ``button`` to be passed as props from ``App.tsx`` to the ``Button`` component we created?
- For that, we do not need to destructure it in argument every time, but we can use ``...rest`` .
```tsx
type ButtonProps = React.ComponentProps<"button"> & { variant: string}

export const Button = ({ type, autoFocus, variant, ...rest }: ButtonProps) => {
  return (
    <Button className={variant}></Button>
  )
}
```
- And to use the rest of the attributes or props, we can do this:
```tsx
type ButtonProps = React.ComponentProps<"button"> & { variant: string}

export const Button = ({ type, autoFocus, variant, ...rest }: ButtonProps) => {
  return (
    <Button className={variant} {...rest}></Button>;
  )
}
```
- Also, in the case of ``variant``, there is types such as ``primary``, ``secondary``, ``danger``, ``warning``. For that, we can just use ``union``.
```tsx
type ButtonProps = React.ComponentProps<"button"> & { 
  variant: "primary" | "secondary" | "danger" | "warning"
}

export const Button = ({ type, autoFocus, variant, ...rest }: ButtonProps) => {
  return (
    <Button className={variant} {...rest}></Button>;
  )
}
```

#### Let's see about Event Handling in same Button Component
- Let's delete types, and destructuring part of the Button, and then lets focus on ``event handling functions`` such as ``onClick``.
- ``onClick`` captures an click event, and we can manipulate based on that, call outer function based on it. But, how do we know what is the type of ``event`` out there ?
- First in this code, hover over the ``event`` in callback function defined in ``onClick={(event) => {}}`` in ``button`` element.
```tsx
export const Button = () => {

  // const handleClick = (e) => {}

  return (
    <button 
    onClick={(event) => {
      
    }}>Click</button>
  )
}
```
- If, we hover over the ``event`` then we see typescript inferred it as ``React.MouseEvent<HTMLButtonElement, MouseEvent>``. Let's copy it and define ``event`` type:
```tsx
export const Button = () => {

  // const handleClick = (e) => {}

  return (
    <button 
    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log(event.target);
    }}>Click</button>
  )
}
```
#### Defining types for React Hookes like ``useState()``, ``useRef(null)``
- We use React hooks often, and earlier, we also discussed about how the ``typescript`` infer the variable as the value we give to ``useState`` like this: ``const [count, setCount] = useState(0);``
- In the above, by seeing value ``0``, typescript infer ``count`` as type ``number``, and for ``setCount``, we discussed about hovering above it and copying it's types.
- But what is the type of ``useState(0)``. Even if we hover over it we do not know?
- For that, it is also based on value we gave. For instance, ``useState(0)`` will have number as type.
- And, if We want to define it explictly, then we can define it as like this using ``<number>``, ``<string>``, and more.
```tsx
import { useState } from 'react';
import './App.css'
// import { Button } from './Button';

function App() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("Rishav");
  return <>
  </>;
}

export default App
```
- It is not the problem here about defining types when we know the initial value, but what happens when we are fetching data from networks? We do not know the initial value and put ``useState(null)`` as the value.
- Due to this variable type is also null, and setVariable type is also null. In that case, use of  ``<custom_type>`` is useful in defining the type of ``useState`` and variables related to it:
```tsx
import { useState } from 'react';
import './App.css'
// import { Button } from './Button';

function App() {
  // const [count, setCount] = useState(0);
  // const [name, setName] = useState("Rishav");

  // fetching data from network... means we do not know the inital value, so we put useState(null)
  // todo list...
  type Todo = {
    data: string;
    isCompleted: boolean;
  }

  const [todo, setTodo] = useState<Todo | null>(null);
  return <>
  </>;
}

export default App
```
- But, everytime we may not know in which format do the data may be sent through the network or server?
- So, we add `` | null`` in ``const [todo, setTodo] = useState<Todo | null>(null);``
- Now, suppose, we got the data in a totally different format than we expected. Generally to access the value, we use ``todo.data`` if the ``todo`` value is not ``null`` like this:
```tsx
type Todo = {
  data: string,
  isCompleted: boolean
}

const [todo, setTodo] = useState<Todo | null>(null);

// Just a sample data usage ok!
if (todo) {
  let data = todo.data;
  console.log("The data is: " + data);
}
```
- Now, if the data sent from server is not in json format, then we either map it or use it in jsx, or database, then the entire application may crash.
- So, we can just add ``?`` after ``todo`` in operations to do **``optional chaining.``** Then, even if the data is not in format, it will return undefined, and we can operate based on it.
```tsx
if (todo) {
  let data = todo?.data; // if not in format, then undefined is returned
  console.log("The data is: " + data);
}
```

**useRef**
- Let's focus on ``useRef()`` part, and defining it's type.
- ``useRef(0)`` is typically used to store values and we do not want a re-render. It is also used for referencing DOM elements like ``document.getElementById`` when we want to directly access a DOM node.
- Here, we are specifying ``Element`` type, we are referencing to? For more precision, we can use ``HTMLButtonElement`` as type.
```tsx
import { useRef } from 'react';
import './App.css'

function App() {
  
  const ref = useRef<HTMLButtonElement>(null);
  // let's assume useRef is being used in button

  return <>
  <button ref={ref}></button>
  </>;
}

export default App
```
### Let's see types regarding constants and lists
- Let's create a list of links as constant like this:
```tsx
const links = ["https://www.google.com", "https://www.facebook.com"];
```
- Typescript infer type of ``links`` as ``string[]``
- Now, when we ``map`` it in ``jsx`` like this:
```tsx
{links.map((l) => {})}
```
- Then, we hover over ``l`` then it says ``l`` is of type ``string``.
- Upto here, is not problem, and we can do normal operatons.
- But, when we do, ``links[0] = "something"``, before returning the ``jsx``, then even though we used ``const``, we can still change the value.
- It is not ``typescript`` fault but it is in ``javascript``. 
- So, to not do so, we can assert type of ``links`` as ``readonly`` like this:
```tsx
const links = ["https://www.google.com", "https://www.facebook.com"] as const;
links[0] = "something"
```
- Now, typescript asserts ``links`` as ``readonly``, and we can see error on ``links[0] = "something"``.
- This is now called **Type Assertions**.

### Let's see another example on where **Type Assertions** can be used.
- Take an example of ``themeMode`` which we stored in the ``localStorage`` from where we want to retrieve the ``string`` and place it in ``html`` part or wherever. And, with this change it reflects in almost every UI, which is how we set up. Let's assume it:
- Now, how do ``typescript`` will know which type we are retrieving from the ``localStorage``, and if we hover over it we will know that ``typescript`` inferred it as ``string | null``. But, we do know that we are only taking either ``dark`` or ``light``. This is where we can use ``type assertions`` like this:
```tsx
import { useEffect } from 'react';
import './App.css'

function App() {

  type theme = "dark" | "white";

  useEffect(() => {
    const themeMode = localStorage.getItem("themeMode") as theme;
    // do whatever we are doing here, changing html attribute or style part or whatever here
  }, [/*here, are the variables or states we put, if something is changed there, then it will re-render it*/])

  return <>
  </>;
}

export default App
```

#### Generic Type in passing props in React Component
- Let's define our own props like ``value`` as type ``number``, and ``valueList`` as type ``number[]`` inside ``Button`` component.
- This is how we pass the props by destructuring the object inside the argument.
```tsx
type ButtonProps = { 
  value: number, 
  valueList: number[]
}

export const Button = ({ value, valueList }: ButtonProps) => {

  return (
    <>
    {value}
    {valueList}
    </>
  )
}
```
- And, this is how we are passing values in props in Button component in ``App.tsx``.
```tsx
import './App.css'
import { Button } from './Button';

function App() {

  return <>
  <Button value={5} valueList={[1, 2, 3, 4]} ></Button>
  </>;
}

export default App
```
- Now, if we change ``valueList`` like this ``valueList = {[1, 2, "3", 4]}``, then obviously it will result in an error. Because, we have not defined the type as ``string`` and also in ``number[]``, we can't put ``string`` inside it.
- So, here we use ``generics``:
```tsx
type ButtonProps<T> = { 
  value: T, 
  valueList: T[]
}

function Button<T>({ value, valueList }: ButtonProps<T>) {

  return (
    <>
    <button></button>
    </>
  )
}

export default Button;
```
- But, if we wrote type ``string`` here, 
```tsx
<Button value={"5"} valueList={[1, 2, 3, 4]} ></Button>
```
- Then, the ``valueList`` will also expect ``string``. Here, we are only using how to use generics in this part.
- One way, is to change the part where we do not need ``generics`` like this:
```tsx
type ButtonProps<T> = { 
  value: T, 
  valueList: string[]
}
```

### Using Types globally from one folder and file
- In ``Typescript``, generally, we can define types in one folder, and later when we need it, we could import it to the file. 
- For instance, we make a type for color in ``@types`` folder and name it ``color.types.ts``. Then we can define type like this:
```tsx
export type colorList = "red" | "green" | "blue" ;
```
- And, then we can use this type like this:
```tsx
import type { colorList } from './@types/color.types';
import './App.css'

function App() {
  
  const backgroundColor: colorList = "red";

  return <>
  {backgroundColor}
  </>;
}

export default App
```
- Suppose, we need to define types for ``UserTypes`` which we do not want to define regularly, then, we can define it in ``user.types.ts`` as ``enum`` with relative constant and it's value like this:
```tsx
export enum UserTypes {
    INDIVIDUAL = "INDIVIDUAL",
    AGENCY = "AGENCY",
}
```
- Then, we can use this in file as per need. But, for removing error here, which i do not know why it came, but i tried sorting it, which led to change in the ``tsconfig.app.json`` for ``"erasableSyntaxOnly": false,`` which is in linting part. It was initially ``true`` and i do not know why it did that.
- Sometimes, we use globally needed types which can be defined in ``global.types.ts`` like ``UserTypes`` or types that is used in multiple location. It included some ``common types``.

- Invoking any type in the ``.tsx`` file includes importing them, and storin it in ``const`` like this:
```tsx
import { colorList } from "./@types/color.types";
const backgroundColor: colorList = "red"; // which we took from three types we defined earlier
```
- But, we can also invoke the types like this:
```tsx
import { type colorList } from "./@types/color.types";

new colorList(); // this was according to Everyday karma channel, and at both, video, and my app.tsx, this part showed in red color stating this:

/*
'colorList' only refers to a type, but is being used as a value here
*/

// but when i looked at my app.tsx, in this way type was imported and invoked.
import type { colorList } from './@types/color.types';
```
### Defining and Using Custom Types from API Data in React + TypeScript
- When working with API responses, especially in TypeScript and React, it's important to handle types properly for safety and clarity.

#### Step 1: Use ``unknown`` as the Initial Type
- Since data fetched from an API is not known at compile time, it's best practice to initially type it as unknown:
```tsx
useEffect(() => {
    fetch("https://api.github.com/users/Greshanris", { method: "GET" })
    .then((res) => res.json())
    .then((data: unknown)=>{
      // here, we will do things
    }
})
```
- And, then we can use ``if`` statement like this:
```tsx
// if we are fetching data from a network, throught any method: GET, PUT, POST, PATCH
//       it is recommended to put data type as unknown as we do not know anything about it.

//       Then, we can use like this below code:

//       ----------code----------------
      if (typeof data === "object" && data != null && "followers" in data) {
        setFollowers(data.followers)
      }
```
#### Step 2: Define a custom type based on expected structure
- We can define a custom type that reflects the structure of the JSON response. For example:
```tsx
type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
```
- 💡 It's a good practice to move this type to a shared type file, e.g., @types/github.types.ts, and export it:
```tsx
export type { GithubUser };
```
#### Step 3: Use Type Assertion After Validating Shape
```tsx
const githubUser = data as GithubUser;
setFollowers(githubUser.followers);
```
- ⚠️ Note: Type assertion (``as GithubUser``) is not a validation. It just tells TypeScript: "Trust me, I know this is the shape." This could lead to runtime errors if the structure doesn't match.

#### Alternative to Type Assertion: Runtime Validation (Yup / Zod)
- Instead of blindly asserting, we can use schema validators to ensure the shape matches at runtime.
```tsx
import * as yup from 'yup';
import { InferType } from 'yup';

const userSchema = yup.object({
  login: yup.string().required(),
  followers: yup.number().required(),
  // ... (only add fields you need)
});

type GithubUser = InferType<typeof userSchema>;

const validatedUser = await userSchema.validate(data);
setFollowers(validatedUser.followers);
```
- ✅ This ensures that even if the API returns a malformed object, your app won’t crash — instead, you can catch and handle validation errors safely.


### Suppose you are using a third-party library, and there is type for it in typescript.
- In this case, we mostly create our own custom ``type`` for defination => ``d``. For it, we create a file like ``index.d.ts`` and we use it
- Let's take ``nepali-date-converter`` as a third-party library
```tsx
// this is in index.d.ts
declare module "@sbmdkl/nepali-date-converter"; // And, we can ignore it using it.
```