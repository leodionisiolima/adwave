#!/bin/bash

# Define o caminho do diretório do projeto
project_dir=~/Projects/adwave
output_file="$project_dir/.0excluir2"

# Limpa o arquivo de saída caso já exista
> "$output_file"

# Função para concatenar arquivos .ts
concatenate_ts_files() {
  local dir=$1
  for file in "$dir"/*.ts; do
    # Ignora se não houver arquivos .ts no diretório atual
    [ -e "$file" ] || continue

    # Adiciona o nome do arquivo ao arquivo de saída
    echo ">>> $file" >> "$output_file"
    
    # Concatena o conteúdo do arquivo ao arquivo de saída
    cat "$file" >> "$output_file"
    
    # Adiciona uma quebra de linha após o conteúdo do arquivo
    echo -e "\n" >> "$output_file"
  done
}

# Percorre recursivamente os subdiretórios e concatena arquivos .ts
find "$project_dir" -type d ! -path "$project_dir/node_modules*" | while read dir; do
  concatenate_ts_files "$dir"
done

echo "Todos os arquivos .ts foram concatenados em $output_file"
