import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class cosa {
  
	public static String readln(int num, String file) throws FileNotFoundException, IOException {
	    try(BufferedReader br = new BufferedReader(new FileReader(file))) {
	        int n = 0;
	        while (n < num) {
	            br.readLine();
	            n++;
	        }
	        return br.readLine();
	    }
	}
	
	public static void first(List<String> l) {
		String prev = "";
		for (int i = l.size()/2-1; i < l.size(); i++) {
			if (prev.equals("A") && l.get(i).equals("B")) {
				l.set(i-1, ""); l.set(i, "");
				l.set(l.size()/2-2, "A"); l.set(l.size()/2-1, "B");
				break;
			}
			prev = l.get(i);
		}
	}
	
  public static void main(String[] args) throws FileNotFoundException, IOException {

	String cosa = readln(Integer.parseInt(args[1]), args[0]);
	String[] cosa2 = cosa.split("");
	List<String> cos = new ArrayList<String>();
	for (String s : cosa2) {
		cos.add("");
	}
	for (String string : cosa2) {
		cos.add(string);
	}
	first(cos);
	System.out.println(cos);
	middlething(cos);
	System.out.println(cos);
	System.out.println(cos);
    
    // PrintWriter pwInput = new PrintWriter(r);
    //
    // // Write to a File
    // pwInput.println("Francine");
    // pwInput.println("Mukoko");
    // // After using the PrintWriter object, de-allocated its memory
    // pwInput.close();
    // // For convenience, let the user know that the file has been created
    // System.out.println("The file has been created.");
  }

private static void middlething(List<String> cos) {
	
}
}
