/*
	[ T2 Stat Parser for DarkTiger's Stats]

	A player stat parser that retrieves stat files via FTP
	and imports them into a postgres db daily

*/

package main

import (
	"fmt"
)

func main() {
	fmt.Println("Starting FTP stat file download")
	initFTP()
	fmt.Println("Stat files downloaded!")

	fmt.Println("Starting stat parser")
	initParser()
	fmt.Println("All done!")
}
