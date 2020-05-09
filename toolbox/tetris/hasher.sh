for run in {1..120}
do
  (md5sum < <(cat "outputs/$run.txt" | tr -d "[:space:]")) | cut -c -32 >> tetris_hash.txt
done