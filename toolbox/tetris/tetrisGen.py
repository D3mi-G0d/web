#!bin/bash/env python3

# T
# Xb Yb Vb
# Xg Yg Ag

import random

TC = 10

print(TC)

while(TC):
  print(f'{random.randint(1000,40000)} {random.randint(1000,40000)} {random.random() * random.randint(1,500):.2f}')
  print(f'{random.randint(1,20000)} {random.randint(1000,30000)} {random.random() * random.randint(1,1000):.2f}')
  TC = TC - 1


