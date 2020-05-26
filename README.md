# Cartogrphy of COVID-19 Scientific Literature

Network visualizations are useuful instrument to have a distant view from a subject. This visualization was created to give an idea of the scientific community behind the COVID-19 subject. Who they are? When they began? With whom they work? Which are their specializationtions?

## Method

Using an open-source database called <a href='https://pages.semanticscholar.org/coronavirus-research'>COVID&#8209;19 Open Research Dataset (CORD&#8209;19)</a> provided by the <a href='https://allenai.org/'>Allen Institute for AI</a>, scientific article were collected by author and then analyzed with methods of Natural Language Processing. The result is a metric of lexical similarity between authors, which enabled to space out the scientifc community as a network; it means that two authors that make use of the same vocabulary are next to each other. (More information about the method on this article titled [Mapping as a Contemporary Instrument for Orientation in Conferences](https://doi.org/10.5281/zenodo.3611341).)

## Use

Open the cartography at this [URL](https://rodighiero.github.io/COVID-19/). After a few seconds for stabilizing forces, a network composed by the major authors working on the COVID-19 subject takes form. The elevation map in yellow points out as peaks the most active areas of research. When two close authors have a common keyword, that is visible between them with a font size that reflects the edge's weigth. By moving over an author, the relative network of peers is highlighted as well as the keywords that define his/her profile. The left panel shows a few author's information with the most relevant keywords, the nationality of his/her community, and the publication years. On the top right a search function to find a specific author.

## Aknoledgements

The project started during the Digital Humanities Conference 2019 with the spirit to create a cartography of the DH community. At that moment, it was priceless the contribution of Daniele Guido (University of Luxembourg), Philippe Rivière (Visiocarto), and Stephan Risi (MIT).

This version has been improved thanks to Eveline Wandl-Vogt [from Austrian Academy of Sciences](https://www.oeaw.ac.at) and Elian Carsenat [NamSor](https://www.namsor.com). The data about nationality are generated through the NamSor algorithm; we understand that reasoning by nationality might introduce bias and errors in the interpretation of the visualization, but we still believe that their use can give further insigths on the literary production. Aggregating information is a way to protect the single author and show the data in a collective way. If someone might be unhappy with some error in the _diaspora.csv_, we are available to to modify it.


## Install the code and run your data

Clone the repository, the install the libraries by typing `npm install`.

Run the local server by typing `npm run start` and open the visualization at this [URL](http://localhost:8080).

If you want to run your data, format the file _./data/authors.json_ properly, according to this structure:

```
	{
		"id": 1
		"name": "Dario Rodighiero",
		"variants": ["Dario Cesare Rodighiero", "Dario C. Rodighiero"],
		"docs": 3,
		"years": {
			"2019": 1,
			"2020": 2,
		},
		"peers": [
			2,
			3,
		],
		"text": "Mapping as a Contemporary Instrument for Orientation in Conferences",
	},
```

The authors.json_ is parsed using _analysis.js_, that runs text analysis to compute the lexical distance. To run the analysis type `node analysis`. This algorithm will produce two files, _nodes.json_ and _links.json_ that are the constituents of the network visualization.

You can now check your visualization at the localhost, or publish its static version using `npm run build` that create the build in the _./docs_ folder.