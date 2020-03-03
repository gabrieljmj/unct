# unct

Visual Studio Code CLI projects manager.

## Install

```terminal
npm install -g unct
```

or

```terminal
yarn global add unct
```

## Dependencies

* NodeJS
* Visual Studio Code installed and added to the envirioment variable ```PATH```

## Usage

It is necessary to configurate the projects root directory. To do that, run the following commands:

```terminal
cd ./my-projects
unct config dir
```

or if you want to specify the directory:

```terminal
unct config dir my-projects
```

### Commands

* ```add``` - adds a project to the list.

  **Options**
  * ```-c, --create``` - if the directory does not exists, creates it.
  
* ```manage``` - shows all folders from projects path.

  **Options**
  * ```-p, --projects``` - lists only projects.
  
* ```open``` - opens a project.
