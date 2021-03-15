package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
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
	ftpPath := os.Getenv("FTP_PATH")
	ftpUSER := os.Getenv("FTP_USER")
	ftpPW   := strings.Replace(os.Getenv("FTP_PW"), `\\`, `\`, -1)

	fmt.Println("Downloading stat files from", ftpHOST + ftpPath)

	cmd := "wget --recursive --no-passive-ftp -nH --cut-dirs=4 --ftp-user=" + ftpUSER + " --no-parent --ftp-password="+ ftpPW +" -P /app/serverStats/stats/ ftp://" + ftpHOST + ftpPath

	err, out, errout := Shellout(cmd)


	if err != nil {
		log.Printf("error: %v\n", err)
	}
	fmt.Println("--- FTP stdout ---")
	fmt.Println(out)
	fmt.Println("--- FTP stderr ---")
	fmt.Println(errout)

}


