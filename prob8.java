class Solution {
    public int myAtoi(String str) {
        long n=0l;
        n=str.length();
        char ch=str.charAt(0);
        int idx=0;
        while(idx<n && ch==' '){
            idx++;
            if(idx<n)
            ch=str.charAt(idx);
        }
        if(idx <n && (ch=='+' || ch=='-' || ((ch-'0')>=0 && (ch-'0')<=9))){
            idx++;
            long no=0l;
            if(idx==n && (ch=='+' || ch=='-'))
            System.out.println(0);
            else if(idx<n){
            char ch1=str.charAt(idx);
            int c=0;
                while((ch1-'0')>=0 && (ch1-'0')<=9){
                    idx++;
                    ch=str.charAt(idx);
                    no=no*10+(ch-'0');
                    c++;
                }
                if(c>0){
                    no=(ch-'0')*10 + no;
                    if(no>=0){
                        if(no<=Integer.MAX_VALUE)
                        System.out.println(no);
                        else
                        System.out.println(Integer.MAX_VALUE);
                    }
                    else{
                        if(no>=Integer.MIN_VALUE)
                        System.out.println(no);
                        else
                        System.out.println(Integer.MIN_VALUE);
                    }
                }
                else{
                    System.out.println(0);
                }
            }
            else
            System.out.println(ch);
        }
        else{
            System.out.println(0);
        }
    }
}