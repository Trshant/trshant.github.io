---
tags: ["conda"]
title: Cheatsheet Conda
created: '2020-06-04T10:14:23.519Z'
modified: '2020-06-04T10:20:38.898Z'
---

# 2 Notes on Conda

## install Conda
```sh
sh Miniconda3-latest-MacOSX-x86_64.sh
```

## Create an environment
```sh
conda create -n MY_ENV python=3.6
```

## Listing the envs
```sh
conda env list
```

## Activate the env
```sh
conda activate MY_ENV
```

## Deactivate env
```sh
conda deactivate
```

## Delete env
```sh
conda env remove --name MY_ENV
```

## Export the env
```sh
conda env export > environment.yml
```

## Restoring the env from a yml file
```sh
conda env create -f environment.yml
```

## Cloning the env
```sh
conda create --name myclone --clone myenv
```

## Using the env in a python file as a shebang
```sh
#!/usr/bin/env conda run -n my_env python
```

Install : <https://docs.conda.io/en/latest/miniconda.html>
Documentation : <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html>

