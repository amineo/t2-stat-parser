package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
)

//ShellToUse is...
const ShellToUse = "sh"

func Shellout(command string) (error, string, string) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd := exec.Command(ShellToUse, "-c", command)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	return err, stdout.String(), stderr.String()
}

func initFTP() {

	ftpHOST := os.Getenv("FTP_HOST")
	ftpUSER := os.Getenv("FTP_USER")
	ftpPW := os.Getenv("FTP_PW")
	ftpPath := os.Getenv("FTP_PATH")

	fmt.Println("Downloading stat files from", ftpHOST + ftpPath)

	err, out, errout := Shellout("wget --recursive -nH --cut-dirs=4 --user=" + ftpUSER + " --no-parent --password=" + ftpPW + " -P /app/serverStats/stats/ ftp://" + ftpHOST + ftpPath)



	if err != nil {
		log.Printf("error: %v\n", err)
	}
	fmt.Println("--- FTP stdout ---")
	fmt.Println(out)
	fmt.Println("--- FTP stderr ---")
	fmt.Println(errout)

}
