from flask import Flask, request, render_template
import os
from dotenv import load_dotenv
from supabase import create_client

# Cargar variables
load_dotenv()

password_secreta = os.getenv("ADMIN_PASS")

# Obtener variables con un valor por defecto vacío para evitar el error de "None"
url = os.environ.get("SUPABASE_URL", "")
key = os.environ.get("SUPABASE_ROLE_KEY", "")

# Validar antes de operar
if not url or not key:
    print("❌ ERROR: No se encontraron las credenciales en el archivo .env")
    exit()


try:
    supabase = create_client(url, key)
    print("✅ Cliente de Supabase conectado")
except Exception as e:
    print(f"❌ Error al crear el cliente: {e}")

# Configuramos Flask para que sepa que los archivos están afuera de /api
app = Flask(__name__)

@app.route('/singup')
def index():
    return render_template('index.html')

@app.route('/')
def inicio():
    try:
        # Consultamos la tabla 'imagenes'
        # Traemos la descripcion y la url_image que guardamos antes
        response = supabase.table('imagenes').select("*").execute()
        
        # Pasamos la lista de imagenes a la plantilla HTML
        return render_template('inicio.html', productos=response.data)
    except Exception as e:
        print(f"Error al obtener productos: {e}")
    return render_template('inicio.html', productos=[])

@app.route('/perfil')
def perfil():
    return render_template('perfil.html')

@app.route('/terminos')
def admin():
    return render_template('terminos.html')

@app.route('/administrador_supermo_unico', methods=['POST'])
def terminos():
    try:
        password = request.form.get('password')
        
        if password == password_secreta:
            return render_template('admin.html')
        else:
            print('Acceso denegado: ' + password)
            return "acceso denegado", 401
    
    except Exception as e:
        print(f"Error: {e}")
        return "Error interno", 500

@app.route('/registrar_usuario', methods=['POST'])
def registrar_user():
    nombre = request.form.get('nombre')
    telefono = request.form.get('telefono')

    responce = supabase.table('usuario').insert({
        'nombre': nombre,
        'telefono': telefono
    }).execute()

    usuario = responce.data[0]['nombre']

    return {'usuario': usuario}

# Subir imagenes a supabase:...
@app.route('/insertar_plantilla', methods=['POST'])
def subir_imagen():
    try:
        # recoger los datos
        url_image = request.form.get('url_image')
        descripcion = request.form.get('text_descripcion')
        Bucket = request.form.get('sector')
        genero = request.form.get('genero')
        if genero == "null":
            genero = None
            
        file_image = request.files.get('imagen')

        enlace_final = supabase.storage.from_(Bucket).get_public_url(url_image)

        try:
            # insertar los datos en la tabla imagenes
            response_tabla = supabase.table('imagenes').insert({
                'descripcion': descripcion,
                'sector': Bucket,
                'url_image': enlace_final,
                'genero': genero
            }).execute()
            if not response_tabla:
                return {'error': 'hubo un problema'}
            
        except Exception as error_insertar:
            return {'error al insertar': str(error_insertar)}
        
         # Subir la imagen al almacenamiento de Supabase
        try:
            
            # La url_image del frontend ya es la ruta relativa dentro del bucket (ej: hombres/header.png)
            upload_response = supabase.storage.from_(Bucket).upload(
                path=url_image, 
                file=file_image.read(), # <--- IMPORTANTE: .read()
                file_options={"content-type": file_image.content_type} # Opcional pero recomendado
            )
            if not upload_response:
                return "no se envio la imagen"
            
        except Exception as upload_error:
            # Si falla el upload, intentar eliminar el registro de la BD
            id_generado = response_tabla.data[0]["id_camisas"] 
            supabase.table('imagenes').delete().eq('id_camisas', id_generado).execute()
            return {'Error al subir imagen': str(upload_error)}
        
        return {'operacion': 'exitosa'}
            
    except Exception as error_general:
        return {'error': str(error_general)}, 500


#Fin de las rutas de la pagina de inicio de sesion............



if __name__ == '__main__':
    app.run(debug=True)