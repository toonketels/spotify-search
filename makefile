all: sass jade

sass: sass/*.sass
	sass --update sass:app/styles

jade: jade/*.jade
	jade jade --out .

clean:
	rm -r .sass-cache/*
	rm app/styles*
	rm *.html