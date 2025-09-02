"use client";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ToastProvider";
import {Mail} from "lucide-react";
import {Reveal} from "@/components/Reveal";

type FormState = {
  name: string;
  email: string;
  message: string
};
const initial: FormState = {
  name: "",
  email: "",
  message: ""
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const {show} = useToast();

  const onChange = (e : React.ChangeEvent < HTMLInputElement | HTMLTextAreaElement >) => setForm((f) => ({
    ...f,
    [e.target.name]: e.target.value
  }));

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      show({variant: "error", title: "Form belum lengkap", description: "Nama, email, dan pesan wajib diisi."});
      return false;
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!ok) {
      show({variant: "error", title: "Email tidak valid", description: "Periksa format email."});
      return false;
    }
    return true;
  };

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) 
      return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      show({variant: "success", title: "Pesan terkirim", description: "Terima kasih! Akan dibalas secepatnya."});
      setForm(initial);
    } catch  {
      show({variant: "error", title: "Gagal mengirim", description: "Coba lagi sebentar."});
    } finally {
      setLoading(false);
    }
  };

  return (<section id="contact" className="mx-auto max-w-2xl px-6 pb-28">
    <Reveal>
      <h2 className="flex items-center gap-2 text-2xl font-semibold">
        <Mail className="h-5 w-5"/>
        Kontak
      </h2>
    </Reveal>
    <form onSubmit={onSubmit} className="mt-6 space-y-5">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="Nama lengkap"/>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="nama@mail.com"/>
      </div>
      <div>
        <Label htmlFor="message">Pesan</Label>
        <Textarea id="message" name="message" value={form.message} onChange={onChange} placeholder="Tulis pesanmu..."/>
      </div>
      <Button disabled={loading} className="h-11">
        {
          loading
            ? "Mengirim..."
            : "Kirim Pesan"
        }
      </Button>
    </form>
  </section>);
}
