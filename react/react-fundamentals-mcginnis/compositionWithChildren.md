# Passing Children via Props

'Children' refers to whatever is between the opening and closing tags of a component. You can pass this data as an alternative to passing data (props) into the component via setting attributes.

**Whatever is between the opening and closing tag of an element will be accessible inside of the component via props.children.**

```javascript
function Header ({ children }) {
  return (
    <h1 className='header'>
      {children}
    </h1>
  )
}

function Container ({ children }) {
  return (
    <div>
      <Logo />
      {children}
    </div>
  )
}
```

## In Action: Creating a Card component

Since the Popular and Results components use very similar stylings for their cards, we can form a reusable card component that can be applied to both.

```javascript
export default function Card ({ header, subheader, avatar, href, name }) {
    return (
        <div className='card-bg-light'>
            <h4 className='header-lg center-text'>
                {header}
            </h4>
            <img
                className='avatar'
                src={avatar}
                alt={`Avatar for ${name}`}
            />
            {/*subheader is optional, only one card contains it.*/}
            {subheader && (
                <h4 className='center-text'>
                    {subheader}
                </h4>
            )}
            <h2 className='center-text'>
                <a className='link' href={href}>
                    {name}
                </a>
            </h2>
            {children} 
        </div>
    )
}
```

{children} contains all the data nested inside the Card component when you call it. 

```javascript
<Card
    header={`#${index + 1}`}
    avatar={avatar_url}
    href={html_url}
    name={login}
>
    <ul className='card-list'>
    <li>
        <FaUser color='rgb(255, 191, 116)' size={22} />
        <a href={`https://github.com/${login}`}>
        {login}
        </a>
    </li>
    <li>
        <FaStar color='rgb(255, 215, 0)' size={22} />
        {stargazers_count.toLocaleString()} stars
    </li>
    <li>
        <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
        {forks.toLocaleString()} forks
    </li>
    <li>
        <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
        {open_issues.toLocaleString()} open
    </li>
    </ul>
</Card>
```