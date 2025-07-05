import mailbox
import re
import os

def extract_domains_from_mbox(mbox_file_path):
    """
    Extrai domínios únicos de endereços de e-mail 'From' em um arquivo .mbox.
    """
    unique_domains = set()
    
    try:
        # Abre o arquivo .mbox
        mb = mailbox.mbox(mbox_file_path)
        
        print(f"Processando arquivo: {os.path.basename(mbox_file_path)}")
        
        for message in mb:
            # Obtém o cabeçalho 'From'
            from_header = message.get('From')
            
            if from_header:
                # Usa uma expressão regular para encontrar endereços de e-mail no cabeçalho 'From'
                # Esta regex tenta ser abrangente para diferentes formatos: "Nome <email@dominio.com>" ou "email@dominio.com"
                emails = re.findall(r'[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', from_header)
                
                for email_address in emails:
                    # O grupo 1 da regex captura diretamente o domínio
                    domain = email_address.lower() # Converte para minúsculas para consistência
                    unique_domains.add(domain)
                    
    except Exception as e:
        print(f"Erro ao processar {mbox_file_path}: {e}")
        
    return unique_domains

def main():
    # Caminho para a pasta onde você descompactou seus arquivos .mbox
    # Certifique-se de que este caminho esteja correto!
    mbox_folder_path = './seus_emails_exportados' # Altere isso para o caminho real
    
    # Lista para armazenar todos os domínios únicos encontrados
    all_unique_domains = set()
    
    # Verifica se a pasta existe
    if not os.path.isdir(mbox_folder_path):
        print(f"Erro: Pasta '{mbox_folder_path}' não encontrada. Por favor, verifique o caminho.")
        print("Certifique-se de que seus arquivos .mbox estejam descompactados dentro desta pasta.")
        return

    # Itera sobre todos os arquivos na pasta e processa os .mbox
    for filename in os.listdir(mbox_folder_path):
        if filename.endswith('.mbox'):
            file_path = os.path.join(mbox_folder_path, filename)
            domains = extract_domains_from_mbox(file_path)
            all_unique_domains.update(domains)
            
    # Salva os domínios em um arquivo de texto
    output_file = 'dominios_encontrados.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        for domain in sorted(list(all_unique_domains)):
            f.write(domain + '\n')
            
    print(f"\nExtração concluída! {len(all_unique_domains)} domínios únicos encontrados.")
    print(f"Lista de domínios salva em '{output_file}'.")
    print("\nDomínios encontrados (primeiros 20):")
    for i, domain in enumerate(sorted(list(all_unique_domains))):
        if i >= 20:
            break
        print(f"- {domain}")

if __name__ == "__main__":
    main()