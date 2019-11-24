# Fetching Data
*Notes from Tyler McGinnis' React Course*

He began be creating a 'utils' folder in the parent directory and creating a 'api.js' file in that folder.

```javascript
// Takes in a language and fetches all the popular repositories for that language.
export function fetchPopularRepos (language) {
    // Using the github api
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  // making a request
  return fetch(endpoint)
    // fetch returns a promise, and we take the response and format it to JSON.
    .then((res) => res.json())
    .then((data) => {
      // if there are no items, something went wrong.
      if (!data.items) {
        throw new Error(data.message)
      }

      // If there is no error, return the items (an array of repos).
      return data.items
    })
}
```

He then included the line, "*import { fetchPopularRepos } from '../utils/api'*" in the Popular.js file.

## updateLanguage function
updateLanguage(selectedLanguage) is a click event to select and display a language's popular repos. 

```javascript
updateLanguage (selectedLanguage) {
    /* if error AND repos is null, that means it is loading the repos.
    If the user has selected javascript, but they want Ruby, you'd first set repos to null to show you're loading the Ruby repos. */
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    })

    // Invoking the function with the user selected language.
    fetchPopularRepos(selectedLanguage)
      // When the function resolves we'll have those repositories.
      // Set state with the repos returned. 
      .then((repos) => this.setState({
        repos,
        error: null,
      }))
      // if there was an error, catch it, then update error in state.
      .catch(() => {
        console.warn('Error fetching repos: ', error)

        this.setState({
          error: `There was an error fetching the repositories.`
        })
      })
  }
```

### Using truthy values to your advantage
*this is known as short-circuit evaluation.*
```javascript
    {this.isLoading() && <p>LOADING</p>} 
```

If 'this.isLoading()' is truthy, the paragraph element will evaluate. 

## Caching Repositories
Problem: Repeatedly fetching the same repositories. 

The constructor changes:
```javascript
    this.state = {
        selectedLanguage: 'All',
        repos: {}, //Instead of repos being null, it is changed to an empty object.
        error: null,
    }
```

```javascript
updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
      // removed the 'repos: null' line, because it interferes with caching.
    })

    /* Only fetch the repos IF the selectedLanguage key doesn't exist in the repos object. */
    if (!this.state.repos[selectedLanguage]) {
        fetchPopularRepos(selectedLanguage)
        // returns a promise, 'data'
            .then((data) => {
                // updating the state based on the previous state.
                // Setting data as a property on the repos object.
                this.setState(({ repos }) => ({
                    repos: {
                        ...repos, /* use of spread operator. takes all previous properties, and then lets us merge our own data on top of that. */

                        // [selectedLanguage] to evaluate the key.
                        // 'data' is the data returned from fetchPopularRepos.
                        [selectedLanguage]: data
                    }
                }))
            })
            .catch(() => {
            console.warn('Error fetching repos: ', error)

            this.setState({
            error: `There was an error fetching the repositories.`
            })
        })
    }
```

**Updating the 'isLoading() function**
Because we are now caching the repositories, we need to determine if the repository has been cached or not. We'll then display 'Loading' if the language's key doesn't exist on the repos object.

```javascript
isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
}
```

### Understanding destructuring in the context of setState

```javascript
.then((data) => {    
    this.setState(({ repos }) => ({
        repos: {
            ...repos,
            [selectedLanguage]: data
        }
    }))
})
```

* Instead of passing this.setState an object, we pass it a function.
* React invokes this function passing it the current state. 
* We can destructure off of the current state. 
* What is returned from this function is **merged** with the current state.

## Looping over Repos and Creating a card layout

```javascript
function ReposGrid ({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                // Taking all the data that we need and storing them into variables by destructuring.
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const { login, avatar_url } = owner;

                return (
                <li key={html_url} className='repo bg-light'>
                    <h4 className='header-lg center-text'>
                        #{index + 1}
                    </h4>
                    <img
                        className='avatar'
                        src={avatar_url}
                        alt={`Avatar for ${login}`}
                    />
                    <h2 className='center-text'>
                        <a className='link' href={html_url}>{login}</a>
                    </h2>

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
                </li>
                )
            })}
        </ul>
    )
}

// The function call
{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
```

## Results View

