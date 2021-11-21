class Solution {
    public List<String> removeComments(String[] arr) {
        int n=arr.length;
        int c=0;
        List<String>fans=new ArrayList<>();
        for(int i=0;i<n;i++){
            String s=arr[i];
            int m=s.length();
            StringBuilder ans=new StringBuilder();
            boolean flag=false;
            boolean flag2=false;
            
            for(int j=0;j<m;j++){
                char ch=s.charAt(j);
                // if(flag2)
                //     continue;
                if(ch=='/'){
                    
                    if(j+1<m && s.charAt(j+1)=='*' && c==0){
                        if(c==0 && !flag2)
                        c++;
                        j++;
                    }
                    else if(j+1<m && s.charAt(j+1)=='/' && c==0){
                        j++;
                        if(c==0)
                        flag2=true;
                        break;////check
                    }
                    else{
                        if(c==0)
                        ans.append(ch);
                    }
                }
                else if(ch=='*'){
                    if(c==0 && j+1<m && s.charAt(j+1)=='/'){
                        ans.append(ch);
                    }
                    else if(j+1<m && s.charAt(j+1)=='/'){
                        if(c>0)
                        c--;
                        j++;
                        if(ans.length()==0)
                        flag=true;
                    }
                    else{
                        if(c==0)
                        ans.append(ch);
                    }
                }
                else{
                    if(c==0 && !flag2)
                    ans.append(ch);
                }
            }
            
            
            if(ans.length()!=0 && !flag)
             fans.add(ans.toString());
            else if(ans.length()!=0 && flag){
                String temp="";
                if(fans.size()>0)
                 temp=fans.get(fans.size()-1);
                temp+=ans.toString();
                if(fans.size()>0)
                fans.remove(fans.size()-1);
                fans.add(temp); 
                flag=false;
            }
        }
        return fans;
    }
}