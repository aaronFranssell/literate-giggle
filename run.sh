set -e
docker build -t literate-giggle .


if [ "$#" -eq  "0" ]
    then
        export PORT=3000
else
        export PORT="$1"
fi

echo Preparing to run at http://localhost:$PORT

docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p $PORT:3000 literate-giggle

