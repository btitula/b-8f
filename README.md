```shell
nvm use v22.14.0
```

```shell
for file in *; do newFile=`echo $file | sed 's/(/_/g;s/)//g'`; mv "$file" "$newFile" ; done
```
