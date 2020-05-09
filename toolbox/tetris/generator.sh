for run in {1..120}
do
  # touch "/content/drive/My Drive/shebang/tetris/input/$run.txt"
  # touch "/content/drive/My Drive/shebang/tetris/output/$run.txt"
  echo "$PWD"
  python3 tetrisGen.py > "inputs/$run.txt"
  (python3 tetris.py < "inputs/$run.txt") > "outputs/$run.txt"
  echo "inputs/$run.txt"
  echo "outputs/$run.txt"
done
