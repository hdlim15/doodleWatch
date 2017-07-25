def columnSum(table):
	num_rows = len(table)
	num_cols = len(table[0])
	result = [0] * num_cols

	for row in range(num_rows):
		for col in range(num_cols):
			entry = table[row][col]
			result[col] += entry

	return result

def columnSum2(table):
	num_rows = len(table)
	num_cols = len(table[0])
	result = []

	for col in range(num_cols):
		column_sum = 0
		for row in range(num_rows):
			entry = table[row][col]
			column_sum += entry
		result.append(column_sum)

	return result



x = [
	[1,2,3,5],
	[4,5,6,5],
	[7,8,9,5],
]
print(columnSum(x))
print(columnSum2(x))
