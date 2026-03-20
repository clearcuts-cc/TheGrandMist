$url = "https://drive.google.com/drive/folders/1tAySxH3WprPXL_Fo6c0Iyf24qISkoAhq"
$res = Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0"
$res.Content | Out-File -FilePath "d:\TGM LP\drive_content.html"
Write-Host "File saved to d:\TGM LP\drive_content.html"
