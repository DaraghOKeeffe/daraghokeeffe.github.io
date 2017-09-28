# /usr/bin/python
import requests
import hmac
from hashlib import sha256
import time

def main():
	# nonce, key, hmac
	api_secret = "RC9NQ6tfXs2Uk36Ntj68jr3N4"
	api_key = "hOhqIVyWQysk6KpFMDRzPgnwgA"
	userID = "up105904596"
	nonce = str(int(time.time()))
	message = nonce + userID + api_key
	signature = hmac.new(api_secret, message, digestmod=sha256).hexdigest().upper()
	print("Nonce : "+nonce)
	print("Signature : "+signature)
	print("Api_Key : "+api_key)
	print("API_SECRET : "+api_secret)


	params = {'key': api_key, 'signature' : signature, 'nonce': nonce  }
	bal = requests.post("https://cex.io/api/balance/", data=params)
	#print(bal.status_code, bal.reason)
	#print bal.text
	
	eth = 0
	try:
		eth = bal.json()['ETH']['available']
		print "ETH : " + str(eth)
		btc = bal.json()['BTC']['available']
		print "BTC : "+str(btc)
	except:
		print "Oh well, eth = 0"		

	priceETH = requests.get("https://cex.io/api/last_price/ETH/EUR")
	#print priceETH.text

	lpriceETH=0
	try:
		lpriceETH = priceETH.json()['lprice']
		print "Lprice ETH : "+str(lpriceETH)

	except:
		print "oh noes" 
	
	priceBTC =  requests.get("https://cex.io/api/last_price/BTC/EUR")
	try:
		lpriceBTC = priceBTC.json()['lprice']
		print "LPRICE BTC : " + str(lpriceBTC)

	except:
		print "oh noes"

	a = float(eth) * float(lpriceETH)
	b = float(lpriceBTC) * float(btc)
	print "ETH : "+str(a)
	print "BTC : "+str(b)
	print "Total Assets : "+str(a+b)
main()
