#!/bin/bash
# Δημιουργία δομής φακέλων για physics-gym-c

mkdir -p 01-chapter/01-01
mkdir -p 01-chapter/01-02
mkdir -p 01-chapter/01-01b
mkdir -p 01-chapter/01-03
mkdir -p 01-chapter/01-04
mkdir -p 01-chapter/01-05
mkdir -p 01-chapter/01-06

mkdir -p 02-chapter/02-01
mkdir -p 02-chapter/02-02
mkdir -p 02-chapter/02-03
mkdir -p 02-chapter/02-05

mkdir -p 03-chapter/03-01
mkdir -p 03-chapter/03-03
mkdir -p 03-chapter/03-06

mkdir -p 04-chapter/04-01
mkdir -p 04-chapter/04-02

mkdir -p 05-chapter/05-01
mkdir -p 05-chapter/05-02
mkdir -p 05-chapter/05-03
mkdir -p 05-chapter/05-04
mkdir -p 05-chapter/05-05

mkdir -p 06-chapter/06-01
mkdir -p 06-chapter/06-02

mkdir -p 07-chapter/07-01
mkdir -p 07-chapter/07-02

mkdir -p 08-chapter/08-01
mkdir -p 08-chapter/08-03
mkdir -p 08-chapter/08-04

# Δημιουργία placeholder σε κάθε φάκελο
# (το GitHub δεν αποθηκεύει κενούς φακέλους)
find . -type d -name "0*" -exec touch {}/.gitkeep \;

echo "✅ Δομή φακέλων δημιουργήθηκε!"
