require 'csv'
require 'json'

# Reads accountants file
accountants = CSV.read("correntistas_banco_bravos.csv", col_sep: ";", encoding: "ISO8859-1:UTF-8", :headers => true)

# Reads deaths file
deaths = CSV.read("correntistas_obito.csv", col_sep: ";", encoding: "ISO8859-1:UTF-8", :headers => true)

# Creates a list of dead people and fills it with the names from deaths file
deaths_list = [];
deaths.each do |row|
  deaths_list << row['Name']
end

# Removes null columns
accountants.delete(nil);

# Removes dead people from accountants file
accountants.delete_if do |row|
  deaths_list.include? row['name']
end

# Adds a new column called Patrimony
accountants.each_with_index do |row, index|  
	total = (row['Capacidade de pagamento anual'].gsub(/[R$ .]/, "").to_f - (row['Dívida']).gsub(/[R$ .]/, "").to_f).to_s.gsub('.', ',') if row['Dívida'] != nil
  
	row['Patrimônio'] = total if total != "" && total != nil
end

# Removes all rows where Patrimony is negative
accountants.delete_if do |row, index|
  row['Patrimônio'].to_f < 0
end

# Calculates total patrimony
total_patrimony = 0
accountants.each do |row|
  total_patrimony += row['Patrimônio'].to_f if row['Patrimônio'] != nil
end

# Adds a new column called Percentage and calculates its values
accountants.each_with_index do |row, index|  
	percentage = ((100 * row['Patrimônio'].to_f)/total_patrimony).to_s.gsub('.', ',')
  
  row['Porcentagem'] = percentage if percentage != "" && percentage != nil
  row['Patrimônio'] = row['Patrimônio'] if row['Patrimônio'] != nil
end

# Adds a new column called Curve
percentage = 0
accountants.each do |row|
  percentage += row['Porcentagem'].to_s.gsub(',', '.').to_f
  
  if (percentage <= 50)
    row['Curva'] = 'A'
  end
  
  if (percentage > 50 && percentage <= 80)
    row['Curva'] = 'B'
  end
  
  if (percentage > 80)
    row['Curva'] = 'C'
  end
end

# Deletes rows where percentage equals zero
accountants.delete_if do |row, index|
  row['Porcentagem'] == '0,0'
end

# Saves all changes in new file in server folder
CSV.open("../server/public/correntistas_banco_bravos_novo.csv", "w", { col_sep: ";" }) do |file|
  file << accountants.headers
  accountants.each { |row| file << row }
end

# Generates a json file from new csv
accountants_csv = CSV.table('../server/public/correntistas_banco_bravos_novo.csv', col_sep: ";", encoding: 'ISO8859-1:utf-8')
accountants_json = accountants_csv.map { |row| row.to_hash }

# Saves json in new file in server folder
File.open('../server/public/correntistas_banco_bravos_novo.json', 'w') do |file|
  file.puts JSON.pretty_generate(accountants_json)
end

# Delete unused csv file from server folder
File.delete("../server/public/correntistas_banco_bravos_novo.csv") if File.exist?("../server/public/correntistas_banco_bravos_novo.csv")