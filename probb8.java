class Solution {
    public int myAtoi(String s) {
        s.trim();
        int n=s.length();
        String no="";
        
        boolean flag=false;
        for(int i=0;i<n;i++){
            char ch=s.charAt(i);
            if(ch==' ' || ch=='-' || ch=='+'){
                //ignore
                if(i!=0 && (s.charAt(i-1)=='-' || s.charAt(i-1)=='+'))
                    return 0;
            }
            else if(ch>='0' && ch<='9'){
                 no=number(s,i);
                if(i!=0 && s.charAt(i-1)=='-')
                flag=true;
                break;
            }
            else {
                return 0;
            }
        }
        
        long val=0l;
        no=removeleadingzeroes(no);
        n=no.length();
        if(no.length()>=13){
            if(flag)
            return Integer.MIN_VALUE;
            else
            return Integer.MAX_VALUE;
        }
        for(int i=0;i<n;i++){
            int a=no.charAt(i)-'0';
            val*=10;
            val+=a;
        }
        if(!flag && val>=Integer.MAX_VALUE){
            return Integer.MAX_VALUE;
        }
        else if(flag && (val*(-1))<=Integer.MIN_VALUE){
            return Integer.MIN_VALUE;
        }
        if(flag)
        return (int)val*(-1);
        else
        return (int)val;
    }
    public String number(String s,int idx){
        int n=s.length();
        String ans="";
        while(idx<n){
            char ch=s.charAt(idx);
            if(ch>='0' && ch<='9'){
                ans+=ch;
            }
            else
            break;
            idx++;
        }
        return ans;
    }
    public String removeleadingzeroes(String s){
        int n=s.length();
        String ans="";
        for(int i=0;i<n;i++){
            char ch=s.charAt(i);
            if(ch!='0')
                return s.substring(i);
        }
        return ans;
    }
}