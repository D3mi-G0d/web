#!/usr/bin/env python3
import math
def meet(r1,c1,r2,c2,sbk,abt):
  if r1 > r2  or  c2 > c1:
    return -1
  tbk = abs(r2 - r1)/sbk
  tbt = math.sqrt((2*abs(c1 - c2))/abt)
  dif = tbk - tbt
  if(dif < 0):
    return -1
  else:
    return dif


tc = int(input())
while(tc):
  c1,r1,sbk = map(float,input().split())
  c2,r2,abt = map(float,input().split())
  print(f'{meet(r1,c1,r2,c2,sbk,abt):.2f}')
  tc = tc - 1
# tc = float(input())
# c1 = float(input())
# r1 = float(input())
# sbk = float(input())
# c2 = float(input())
# r2 = float(input())
# abt = float(input())

# T
# Xb Yb Vb
# Xg Yg Ag

