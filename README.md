# Lexical Cartography

This data visualization is designed as an instrument to observe conferences; in contrast to the common approach of bibliometrics, which bases its visualization on citations and collaborations, the lexical cartography relies on a lexical distance that we believe is more democratic. The distance is calculated by using a set of articles composed of standard metadata. This article titled [Mapping as a Contemporary Instrument for Orientation in Conferences](https://doi.org/10.5281/zenodo.3611341) authored by Chloe Ye Eun Moon and Dario Rodighiero at MIT CMS/W.

The project template is available at this [URL](https://rodighiero.github.io/LexicalNetwork/).

## See the data visualization

A ready-to-see version of the lexical cartography is available [here](https://rodighiero.github.io/Lexical-Cartography/).

## Install the code and run your data

Clone the repository, the install the libraries by typing `npm install`.

Run the local server by typing `npm run start` and open the visualization at this [URL](http://localhost:8080).

If you want to run your data, stop the server. You have to format them properly in the file _./data/docs.json_. The JSON contains an array of elements structured through standard metadata as it follows:

```
  {
    "title": string
    "text": string
    "authors": array of strings
  }
```

The _docs.json_ is then loaded and parsed using _analysis.js_, that collects texts by author and runs text analysis to compute the lexical distance. To run the analysis type `node analysis`. This algorithm will produce two files, _nodes.json_ and _links.json_ that are the constituents of the network visualization.

You can now check your visualization at the localhost, but if you are happy with that you can publish its static version using `npm run build` that create the build in _./data_.