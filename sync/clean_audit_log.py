import csv

devices_path = r'D:\Sonda\Precix\sync\devices.csv'
audit_log_path = r'D:\Sonda\Precix\sync\audit_log.csv'
audit_log_clean_path = r'D:\Sonda\Precix\sync\audit_log_clean.csv'

def get_valid_device_ids():
    with open(devices_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return set(row['id'] for row in reader)

def filter_audit_log(valid_ids):
    with open(audit_log_path, newline='', encoding='utf-8') as fin, \
         open(audit_log_clean_path, 'w', newline='', encoding='utf-8') as fout:
        reader = csv.DictReader(fin)
        writer = csv.DictWriter(fout, fieldnames=reader.fieldnames)
        writer.writeheader()
        for row in reader:
            if row['device_id'] == '' or row['device_id'] in valid_ids:
                writer.writerow(row)

if __name__ == '__main__':
    valid_ids = get_valid_device_ids()
    filter_audit_log(valid_ids)
    print(f'Arquivo audit_log_clean.csv gerado com registros válidos.')
