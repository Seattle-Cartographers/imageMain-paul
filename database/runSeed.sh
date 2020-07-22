#!/bin/bash

# ./runSeed.sh /path/to/seed.js locations.csv images.csv 100

SEEDFILE=$1
LOCFILE=$2
IMAGESFILE=$3
NUMRECORDS=$4

# postgres stuff, kept for posterity
# echo "writing locations"
# node $SEEDFILE location $NUMRECORDS > $LOCFILE
# echo "writing images"
# node $SEEDFILE image $NUMRECORDS > $IMAGESFILE
# echo "writing locations"
# node $SEEDFILE cassandraLocations $NUMRECORDS > $LOCFILE
echo "writing images"
node $SEEDFILE cassandraImages $NUMRECORDS > $IMAGESFILE
exit 0
