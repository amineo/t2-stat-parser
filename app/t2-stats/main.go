/*

Parser for DarkTiger's T2 Server Stats

[TODO]
	- Read Additional GameTypes on the fly
	- Use go modules
	- Update to v4 SQL driver
	- Ability to download stat files from remote server via FTP
*/

package main

import (
	_ "github.com/amineo/t2-stat-parser"
)

func main() {
	init()
}
