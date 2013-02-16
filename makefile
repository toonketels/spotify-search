all: sass jade

sass: app/sass/*.sass
	sass --update app/sass:app/css

jade: app/jade/*.jade
	jade app/jade --out .

clean:
	rm -r .sass-cache/*
	rm app/css*
	rm *.html