import psycopg2

host = "localhost"
port = "5432"
dbname = "precix"
user = "precix_user"
password = "precix2025"

print(f"host: {repr(host)}")
print(f"port: {repr(port)}")
print(f"dbname: {repr(dbname)}")
print(f"user: {repr(user)}")
print(f"password: {repr(password)}")

try:
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="precix",
        user="precix_user",
        password="precix2025"
    )
    print("Conexão com PostgreSQL bem-sucedida!")
    conn.close()
except Exception as e:
    print(f"Erro ao conectar: {e}")
