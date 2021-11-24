# library-of-babel

Github action which posts the location of a pull request in the [Library of Babel](https://libraryofbabel.info/)!

### What is the Library of Babel?

You can read more on [their website](https://libraryofbabel.info/About.html). In a nutshell, it contains every single permutation of 3200 characters in a lookup. Wow!

### How to use this in your repo!

Now that you're ready to 100x your productivity, you can use this action by including it in a workflow like so:

```
name: 'Library of Babel'
on: pull_request

jobs:
  library-of-babel:
    runs-on: ubuntu-latest
    steps:
      - uses: realSaddy/library-of-babel@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Whenever a brave soul creates a pull request, it will reply with a link to where the librarians at the library already wrote it... should you really merge such unoriginal code?!?
