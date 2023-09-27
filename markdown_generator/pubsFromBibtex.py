#importing the necessary stuff
from pybtex.database.input import bibtex
import pybtex.database.input.bibtex
from time import strptime
import string
import html
import os
import re
import sys
import datetime



#html scape
html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "á": "&aacute;",
    "ä": "&auml;",
    "é": "&eacute;",
    "í": "&iacute;",
    "ó": "&oacute;",
    "ú": "&uacute;",
    "Á": "&Aacute;",
    "É": "&Eacute;",
    "Í": "&Iacute;",
    "Ó": "&Oacute;",
    "Ú": "&Uacute;",
    "ñ": "&ntilde;",
    "Ñ": "&Ntilde;",
    }

def html_escape(text):
    """Produce entities within text."""
    return "".join(html_escape_table.get(c,c) for c in text)

#The actual bybtex parsing and creating files
bibFile = sys.argv[1]
today = datetime.date.today()
parser = bibtex.Parser()
bibdata = parser.parse_file(bibFile)
for bib_key in bibdata.entries:
  sbib_key=bib_key.split("_")
  entry = bibdata.entries[bib_key]
  bib_type = entry.type
  fields = entry.fields
  try:

    if bib_type in ["article"]:

      #fix the pub date
      year="1900"
      month= "01"
      day= "01"
      year = fields["year"]
      if "month" in fields.keys():
        if(len(fields["month"])<3):
          month = "0"+fields["month"]
          month = pub_month[-2:]
        elif(fields["month"] not in range(12)):
          tmnth = strptime(fields["month"][:3],'%b').tm_mon
          month = "{:02d}".format(tmnth)
        else:
          month = str(fields["month"])
      if "day" in fields.keys():
        day = str(fields["day"])

      date = year+"-"+month+"-"+day

      title=""
      title=html_escape(fields["title"].replace("{", "").replace("}","").replace("\\",""))
      #clean_title = fields["title"].replace("{", "").replace("}","").replace("\\","").replace(" ","-")


      #compute the author string
      author=""
      fa= bibdata.entries[bib_key].persons["author"][0]
      author=" ".join(n[0]+"." for n in fa.bibtex_first_names)+" "+fa.last_names[0]
      for i in range(1,len(bibdata.entries[bib_key].persons["author"])):
        aa = bibdata.entries[bib_key].persons["author"][i]
        author = author+", "+" ".join(n[0]+"." for n in aa.bibtex_first_names)+" "+aa.last_names[0]
      author=author+"."
      author=html_escape(author)

      #journal
      journal=""
      if "journal" in fields.keys():
        journal = html_escape(fields["journal"])
      else:
        journal= html_escape(fields["journaltitle"])


      paperurl=""
      if "doi" in fields.keys():
        paperurl = "https://doi.org/"+fields["doi"]
      elif "url" in fields.keys():
        paperurl = fields["url"]
      #paperurl=urllib.parse.quote_plus(paperurl)

      #abstract
      abstract=""
      if "abstract" in fields.keys():
        abstract = html_escape(fields["abstract"])
        abstract.replace("\%","%")

      #bibstring
      bib_string=""
      bib_string = entry.to_string("bibtex")

      html_filename= year + "_" + sbib_key[0] + "_" + sbib_key[2]
      md_filename= html_filename+".md"

      #YAML variables:
      md = "---\ntitle: \""   + title +'"\n'
      md = md + "collection: publications \npermalink: /publication/"+html_filename
      md += "\ndate: " + str(date)
      md += "\nauthor: '" + str(author) +"'"
      md += "\ncitation: '" + str(author) + " " + str(title) + ", " + str(journal) + " (" + str(year) + "). " + str(paperurl) + ".'"
      md += "\njournal: '" +  str(journal) +"'"
      md += "\npaperurl: '" + str(paperurl) +"'"
      if "research" in fields["keywords"]:
        md += "\ntype: '" + "research" +"'"
      if "outreach" in fields["keywords"]:
        md += "\ntype: '" + "outreach" +"'"
      md += "\n--- \n"

      ##Markdown description for individual page

      md += f"\n[Access paper here]({paperurl})"+"{:target=\"_blank\"}\n"

      md += "\n**Abstract**: " + str(abstract)

      md += "\n\nBibtex:\n"
      md += "``` \n " + bib_string + "```"

      md_filename = os.path.basename(md_filename)
      with open("../_publications/" + md_filename, 'w') as f:
                f.write(md)
      print(f'SUCESSFULLY PARSED {bib_key}')

    #here finishes the processing of articles
    if bib_type in ["unpublished"]:

      #fix the pub date
      year=str(today.year)
      month= "01"
      day= "01"
      if "year" in fields.keys():
        year = fields["year"]
      if "month" in fields.keys():
        if(len(fields["month"])<3):
          month = "0"+fields["month"]
          month = pub_month[-2:]
        elif(fields["month"] not in range(12)):
          tmnth = strptime(fields["month"][:3],'%b').tm_mon
          month = "{:02d}".format(tmnth)
        else:
          month = str(fields["month"])
      if "day" in fields.keys():
        day = str(fields["day"])

      date = year+"-"+month+"-"+day

      title=""
      title=html_escape(fields["title"].replace("{", "").replace("}","").replace("\\",""))
      #clean_title = fields["title"].replace("{", "").replace("}","").replace("\\","").replace(" ","-")


      #compute the author string
      autor=""
      fa= bibdata.entries[bib_key].persons["author"][0]
      author=" ".join(n[0]+"." for n in fa.bibtex_first_names)+" "+fa.last_names[0]
      for i in range(1,len(bibdata.entries[bib_key].persons["author"])):
        aa = bibdata.entries[bib_key].persons["author"][i]
        author = author+", "+" ".join(n[0]+"." for n in aa.bibtex_first_names)+" "+aa.last_names[0]
      author=author+"."
      author=html_escape(author)

      #journal
      journal=""
      if "journal" in fields.keys():
        journal = html_escape(fields["journal"])
      elif "journaltitle" in fields.keys():
        journal= html_escape(fields["journaltitle"])
      elif "note" in fields.keys():
        journal= html_escape(fields["note"])

      #note
      note=""
      if "note" in fields.keys():
        journal = html_escape(fields["note"].replace("\%","%"))

      paperurl=""
      if "doi" in fields.keys():
        paperurl = "https://doi.org/"+fields["doi"]
      elif "url" in fields.keys():
        paperurl = fields["url"]
      #paperurl=urllib.parse.quote_plus(paperurl)

      #abstract
      abstract=""
      if "abstract" in fields.keys():
        abstract = html_escape(fields["abstract"])

      #bibstring
      fields["note"]="In preparation"
      fields["keywords"]=fields["keywords"].replace("preparation","")
      bib_string = entry.to_string("bibtex")

      html_filename= year + "_" + sbib_key[0] + "_" + sbib_key[1]
      md_filename= html_filename+".md"

      #YAML variables:
      md = "---\ntitle: \""   + title +'"\n'
      md = md + "collection: publications \npermalink: /publication/"+html_filename
      md += "\ndate: " + str(date)
      md += "\nauthor: '" + str(author) +"'"
      if len(paperurl) > 0:
        md += "\npaperurl: '" + str(paperurl) +"'"
        md += "\ncitation: '" + str(author) + " " + str(title) + " (preprint). " + str(paperurl) + ".'"
      else:
        md += "\ncitation: '" + str(author) + " " + str(title) + " (preprint). '"
      md += "\njournal: '" +  str(journal) +"'"
      md += "\ntype: '" + "preprint" +"'"
      md += "\n--- \n"

      ##Markdown description for individual page
      if len(paperurl) > 0:
        md += f"\n[Preprint here]({paperurl})"+"{:target=\"_blank\"}\n"
      else:
        md +="Preprint not available yet.\n"

      if len(abstract) > 0:
        md += "\n**Abstract**: " + str(abstract)
      else:
        md +="Abstract not available."


      md += "\n\nBibtex:\n"
      md += "``` \n " + bib_string + "```"

      md_filename = os.path.basename(md_filename)
      with open("../_publications/" + md_filename, 'w') as f:
                f.write(md)
      print(f'SUCESSFULLY PARSED {bib_key}')


    #here it finishes the processing of preprints
    if bib_type in ["mastersthesis","phdthesis"]:

      #fix the pub date
      year=str(today.year)
      month= "01"
      day= "01"
      if "year" in fields.keys():
        year = fields["year"]
      if "month" in fields.keys():
        if(len(fields["month"])<3):
          month = "0"+fields["month"]
          month = pub_month[-2:]
        elif(fields["month"] not in range(12)):
          tmnth = strptime(fields["month"][:3],'%b').tm_mon
          month = "{:02d}".format(tmnth)
        else:
          month = str(fields["month"])
      if "day" in fields.keys():
        day = str(fields["day"])

      date = year+"-"+month+"-"+day

      title=""
      title=html_escape(fields["title"].replace("{", "").replace("}","").replace("\\",""))
      #clean_title = fields["title"].replace("{", "").replace("}","").replace("\\","").replace(" ","-")


      #compute the author string
      autor=""
      fa= bibdata.entries[bib_key].persons["author"][0]
      author=" ".join(n[0]+"." for n in fa.bibtex_first_names)+" "+fa.last_names[0]
      for i in range(1,len(bibdata.entries[bib_key].persons["author"])):
        aa = bibdata.entries[bib_key].persons["author"][i]
        author = author+", "+" ".join(n[0]+"." for n in aa.bibtex_first_names)+" "+aa.last_names[0]
      author=author+"."
      author=html_escape(author)

      #journal
      journal=""
      if "type" in fields.keys() or "school" in fields.keys():
        journal = html_escape(fields["type"].replace("{", "").replace("}","").replace("\\","")) + ", " + html_escape(fields["school"]) + "."


      #note
      note=""
      if "note" in fields.keys():
        journal = html_escape(fields["note"].replace("\%","%"))

      paperurl=""
      if "doi" in fields.keys():
        paperurl = "https://doi.org/"+fields["doi"]
      elif "url" in fields.keys():
        paperurl = fields["url"]
      #paperurl=urllib.parse.quote_plus(paperurl)

      #abstract()
      abstract=""
      if "abstract" in fields.keys():
        abstract = html_escape(fields["abstract"])

      #bibstring
      fields["keywords"]=fields["keywords"].replace("thesis","")
      bib_string = entry.to_string("bibtex")

      html_filename= year + "_" + sbib_key[0] + "_" + sbib_key[2]
      md_filename= html_filename+".md"

      #YAML variables:
      md = "---\ntitle: \""   + title +'"\n'
      md = md + "collection: publications \npermalink: /publication/"+html_filename
      md += "\ndate: " + str(date)
      md += "\nauthor: '" + str(author) +"'"
      if len(paperurl) > 0:
        md += "\npaperurl: '" + str(paperurl) +"'"
      md += "\ncitation: '" + str(author) + " " + str(title) + ", " + str(journal) + ", " + str(year) + ". " + "'"
      md += "\njournal: '" +  str(journal) +"'"
      md += "\ntype: '" + "thesis" +"'"
      md += "\n--- \n"

      ##Markdown description for individual page
      if len(paperurl) > 0:
        md += f"\n[See it here]({paperurl})"+"{:target=\"_blank\"}\n"


      md += "\n[Download it here]({{ site.url }}/files/theses/"+bib_key+".pdf)"+"{:target=\"_blank\"}\n"

      if len(abstract) > 0:
        md += "\n**Abstract**: " + str(abstract)



      md += "\n\nBibtex:\n"
      md += "``` \n " + bib_string + "```"

      md_filename = os.path.basename(md_filename)
      with open("../_publications/" + md_filename, 'w') as f:
                f.write(md)
      print(f'SUCESSFULLY PARSED {bib_key}')


      #here finishes the processing of articles


  except KeyError as e:
    print(f'WARNING Missing Expected Field {e} from entry {bib_key}: \"', fields["title"][:30],"..."*(len(fields['title'])>30),"\"")

  continue
