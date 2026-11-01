// Ambil tempat isi tabel dari HTML
var isi = document.getElementById("isi");

// Ubah angka jadi format rupiah, contoh: 5000 jadi "Rp 5.000"
function rupiah(angka) {
  return "Rp" + Math.round(angka).toLocaleString("id-ID");
}

// Ambil angka dari input, kalau kosong atau minus jadi 0
function ambil(kolom) {
  var angka = Number(kolom.value);
  if (isNaN(angka) || angka < 0) {
    angka = 0;
  }
  return angka;
}

// Menambah satu baris barang ke tabel
function tambahBaris(nama, harga, jumlah, diskon) {
  var baris = document.createElement("tr");

  baris.innerHTML =
    '<td><input class="nama" value="' + (nama || "") +
    '" placeholder="Nama barang"></td>' +
    '<td><input class="harga" type="number" value="' +
    (harga || "") + '" oninput="hitung()"></td>' +
    '<td><input class="jumlah" type="number" value="' +
    (jumlah || 1) + '" oninput="hitung()"></td>' +
    '<td><input class="diskon" type="number" value="' +
    (diskon || "") + '" oninput="hitung()"></td>' +
    '<td class="sub">Rp 0</td>' +
    '<td><button class="btn-hapus" ' +
    'onclick="hapusBaris(this)">x</button></td>';

  isi.appendChild(baris);
  hitung();
}

// Menghapus baris yang tombolnya diklik
function hapusBaris(tombol) {
  tombol.parentNode.parentNode.remove();
  hitung();
}

// Menghitung semua barang di tabel
function hitung() {
  var semuaBaris = isi.getElementsByTagName("tr");
  var totalNormal = 0;
  var totalBayar = 0;

  for (var i = 0; i < semuaBaris.length; i++) {
    var baris = semuaBaris[i];

    // 1. Ambil data satu barang
    var harga = ambil(baris.querySelector(".harga"));
    var jumlah = ambil(baris.querySelector(".jumlah"));
    var diskon = ambil(baris.querySelector(".diskon"));
    if (diskon > 100) {
      diskon = 100;
    }

    // 2. Rumus per barang
    var normal = harga * jumlah;
    var potongan = normal * diskon / 100;
    var bayar = normal - potongan;

    // 3. Tampilkan subtotal barang, lalu jumlahkan
    baris.querySelector(".sub").innerHTML = rupiah(bayar);
    totalNormal = totalNormal + normal;
    totalBayar = totalBayar + bayar;
  }

  // 4. Tampilkan hasil akhir
  document.getElementById("normal").innerHTML = rupiah(totalNormal);
  document.getElementById("hemat").innerHTML =
    rupiah(totalNormal - totalBayar);
  document.getElementById("total").innerHTML = rupiah(totalBayar);
}

// Menghapus semua barang, lalu sisakan satu baris kosong
function resetSemua() {
  isi.innerHTML = "";
  tambahBaris();
}

// Contoh data awal saat halaman dibuka
tambahBaris("Beras 5 kg", 68000, 1, 10);
tambahBaris("Minyak goreng 2 L", 38000, 2, 6);
tambahBaris("Telur 1 kg", 30000, 1, 5);
